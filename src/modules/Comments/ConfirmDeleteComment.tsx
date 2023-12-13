import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
  Text,
  ModalBody,
  Center,
  VStack,
  HStack,
  Button,
} from "@chakra-ui/react";
import { useDeleteComment } from "../../hooks/Comments.api";

interface DeleteCommentProps {
  doc_id: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ConfirmDeleteComment: React.FC<DeleteCommentProps> = ({
  doc_id,
  isOpen,
  onClose,
}) => {
  const deleteComment = useDeleteComment();
  const toast = useToast();
  const handleSuccess = () => {
    toast({
      title: "Deletion Success",
      description: `Comment deleted successfully `,
      status: "success",
      duration: 3000,
      position: "top",
      isClosable: true,
    });
  };
  const handleDelete = async () => {
    await deleteComment.mutateAsync(doc_id);
    handleSuccess();
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent mx={3} py={5} alignItems="center">
          <ModalHeader>
            <Text>Are you sure you want to delete</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center w="100%" alignItems="center" justifyContent="center">
              <VStack>
                <Text>Comment with Document ID: {doc_id}</Text>
              </VStack>
            </Center>
            <HStack justifyContent="space-between" marginTop={4}>
              <Button
                size="sm"
                px={4}
                colorScheme="gray"
                onClick={onClose}
                mr={2}
              >
                Cancel
              </Button>
              <Button
                // isDisabled={isPending}
                onClick={handleDelete}
                size="sm"
                px={4}
                colorScheme="red"
              >
                Delete
              </Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
