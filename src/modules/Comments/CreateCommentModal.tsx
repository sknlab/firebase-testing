import { Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner, useToast } from "@chakra-ui/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";
import { useCreateComment } from "../../hooks/Comments.api";

interface CreateCommentProps {
  isOpen: boolean;
  onClose: () => void;
  articleId: string | undefined;
}

export const CreateCommentModal: React.FC<CreateCommentProps> = ({ isOpen, onClose, articleId }) => {
  const { user } = useContext(AuthContext);
  const createComment = useCreateComment();
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
      description: `Comment ID ${id} created successfully `,
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

  const onSubmit = async (comment: { comment: string; date: string }) => {
    const data = {
      user_uid: user?.uid,
      user_email: user?.email,
      ...comment,
      article_id: articleId,
    };
    const res = await createComment.mutateAsync(data);
    if (res) {
      handleSuccess(res?.id);
      onClose();
    }
    if (createComment?.isError) {
      handleError();
    }
    reset();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent mx={3} py={5}>
          <ModalHeader>Add a comment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Comment</FormLabel>
              <Input
                isRequired
                {...register("comment", {
                  required: { value: true, message: "This field is required " },
                })}
                type="text"
              />
              {errors?.comment && <FormErrorMessage>This field is required</FormErrorMessage>}
            </FormControl>

            <HStack justifyContent="flex-end" marginTop={4}>
              <Button size="sm" variant="outline" onClick={onClose} mr={2}>
                Cancel
              </Button>
              <Button isDisabled={isDirty && !isValid} onClick={handleSubmit(onSubmit as SubmitHandler<FieldValues>)} size="sm" px={4} colorScheme="green">
                {createComment.isPending ? <Spinner /> : `Create`}
              </Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
