import {
  Button,
  Center,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';

import { useDeleteArticle } from '@/hooks/Blogs.api';
import { useNavigate } from 'react-router-dom';

export default function ConfirmDeleteModal({ doc_id, isOpen, onClose }: { doc_id: string; isOpen: boolean; onClose: () => void }) {
  const deleteArticle = useDeleteArticle();
  const { isPending } = deleteArticle;
  const toast = useToast();
  const navigate = useNavigate();

  const handleSuccess = () => {
    toast({
      title: 'Deletion Success.',
      description: `Blog deleted successfully `,
      status: 'success',
      duration: 3000,
      position: 'top',
      isClosable: true,
    });
  };

  const handleDelete = async () => {
    await deleteArticle.mutateAsync(doc_id);
    onClose();
    handleSuccess();
    navigate('/');
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
                <Text>Article with Document ID: {doc_id}</Text>
              </VStack>
            </Center>
            <HStack justifyContent="space-between" marginTop={4}>
              <Button size="sm" px={4} colorScheme="gray" onClick={onClose} mr={2}>
                Cancel
              </Button>
              <Button isDisabled={isPending} onClick={handleDelete} size="sm" px={4} colorScheme="red">
                {isPending ? (
                  <Flex gap={2}>
                    Delete <Spinner size="sm" />
                  </Flex>
                ) : (
                  `Delete`
                )}
              </Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
