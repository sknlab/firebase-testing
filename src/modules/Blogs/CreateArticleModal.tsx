import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { AuthContext } from "@/context/AuthContext";
import { useCreateArticle } from "@/hooks/Blogs.api";
import { useContext } from "react";

export const CreateArticleModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { user } = useContext(AuthContext);
  const createArticle = useCreateArticle();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: "all" });

  const handleSuccess = (id: string | null | undefined) => {
    toast({
      title: "Creation Success.",
      description: `Blog ID ${id} created successfully `,
      status: "success",
      duration: 3000,
      position: "top",
      isClosable: true,
    });
  };

  const handleError = () => {
    toast({
      title: "Error!",
      description: "An error occurred",
      status: "error",
      position: "top",
      duration: 4000,
      isClosable: true,
    });
  };

  const onSubmit = async (article: { title: string; description: string; date: string }) => {
    const data = { user_uid: user?.uid, user_email: user?.email, ...article };
    const res = await createArticle.mutateAsync(data);
    if (res) {
      handleSuccess(res?.id);
      onClose();
      reset({
        title: "",
        description: "",
      });
    }
    if (createArticle?.isError) {
      handleError();
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent mx={3} py={5}>
          <ModalHeader>Write A Blog</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input isRequired {...register("title", { required: { value: true, message: "This field is required " } })} type="text" />
              {errors?.title && <FormErrorMessage>This field is required</FormErrorMessage>}
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea isRequired {...register("description", { required: { value: true, message: "This field is required " } })} />
              {errors?.description && <FormErrorMessage>This field is required</FormErrorMessage>}
            </FormControl>

            <HStack justifyContent="flex-end" marginTop={4}>
              <Button size="sm" variant="outline" onClick={onClose} mr={2}>
                Cancel
              </Button>
              <Button
                isDisabled={isDirty && !isValid}
                onClick={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
                size="sm"
                px={4}
                colorScheme="green">
                {createArticle?.isPending ? (
                  <Flex gap={2}>
                    Create <Spinner size="sm" />
                  </Flex>
                ) : (
                  `Create`
                )}
              </Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
