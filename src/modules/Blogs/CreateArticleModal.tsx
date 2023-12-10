import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";

// import { useCreatePost } from "../hooks";
import { useForm } from "react-hook-form";

export const CreateArticleModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  //  / const toast = useToast();
  //   const createPostMutation = useCreateArticle({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (article) => {
    // createPostMutation?.mutate(article);
    // if (createPostMutation?.isSuccess) {
    //   toast({
    //     title: "Post Created!",
    //     description: "Post Successfully Created!",
    //     status: "success",
    //     position: "top-right",
    //   });
    // }
    // if (createPostMutation?.isError) {
    //   toast({
    //     title: "Error!",
    //     description: "An error occurred",
    //     status: "error",
    //     position: "top-right",
    //   });
    // }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input isRequired {...register("title")} type="text" />
              </FormControl>
              <FormControl>
                <FormLabel>Body</FormLabel>
                <Textarea
                  isRequired
                  {...register("body")}
                  // type='text'
                />
              </FormControl>
              <HStack justifyContent="flex-end" marginTop={4}>
                <Button size="sm" variant="outline" onClick={onClose} mr={2}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" px={4} colorScheme="green">
                  Create
                </Button>
              </HStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
