import { Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner, useToast } from "@chakra-ui/react";
import { useEditComment } from "../../hooks/Comments.api";
import { Comment } from "../../types/comments.types";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";

interface CommentProps {
  isOpen: boolean;
  onClose: () => void;
  currentComment: Comment;
}

export default function EditCommentModal({ isOpen, onClose, currentComment }: CommentProps) {
  const editComment = useEditComment();
  const toast = useToast();
  const { doc_id, comment } = currentComment;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm();
  useEffect(() => {
    if (currentComment) {
      setValue("comment", currentComment.comment);
    }
  }, [currentComment, setValue]);

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
      duration: 3000,
      isClosable: true,
    });
  };

  const onSubmit = async (fieldsData: { comment: string }) => {
    const data = { doc_id, ...fieldsData };
    await editComment.mutateAsync(data);

    if (editComment?.isError) {
      handleError();
    } else {
      handleSuccess(doc_id);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent mx={3} py={5}>
        <ModalHeader>Edit your comment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Comment</FormLabel>
            <Input isRequired defaultValue={comment} {...register("comment", { required: { value: true, message: "This field is required" } })} type="text" />
            {errors?.comment && <FormErrorMessage>This field is required</FormErrorMessage>}
          </FormControl>
          <HStack justifyContent="flex-end" marginTop={4}>
            <Button size="sm" variant="outline" onClick={onClose} mr={2}>
              Cancel
            </Button>
            <Button isDisabled={isDirty && !isValid} onClick={handleSubmit(onSubmit as SubmitHandler<FieldValues>)} size="sm" px={4} colorScheme="green">
              {editComment?.isPending ? <Spinner /> : `Update`}
            </Button>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
