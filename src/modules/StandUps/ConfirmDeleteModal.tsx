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

import { useDeleteStandUp } from '@/hooks/StandUps.api';
import { useNavigate } from 'react-router-dom';

export default function ConfirmDeleteModal({ doc_id, isOpen, onClose }: { doc_id: string; isOpen: boolean; onClose: () => void }) {
  const deleteStandUp = useDeleteStandUp();
  const { isPending } = deleteStandUp;
  const toast = useToast();
  const navigate = useNavigate();

  const handleSuccess = () => {
    toast({
      title: 'Deletion Success.',
      description: `StandUp deleted successfully `,
      status: 'success',
      duration: 3000,
      position: 'top',
      isClosable: true,
    });
  };

  const handleDelete = async () => {
    await deleteStandUp.mutateAsync(doc_id);
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
                <Text>StandUp with Document ID: {doc_id}</Text>
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
