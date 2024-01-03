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
} from '@chakra-ui/react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { useEditStandUp } from '@/hooks/StandUps.api';
import { StandUpProps } from '@/types/standUps.types';

export const EditStandUpModal = ({
  standUp,
  handleUpdateStandUp,
  isOpen,
  onClose,
}: {
  standUp: StandUpProps;
  handleUpdateStandUp: (res: {} | undefined) => void;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { doc_id, title, description } = standUp;
  const editStandUp = useEditStandUp();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: 'all' });

  const handleSuccess = (id: string | null | undefined) => {
    toast({
      title: 'Creation Success.',
      description: `StandUp ID ${id} created successfully `,
      status: 'success',
      duration: 3000,
      position: 'top',
      isClosable: true,
    });
  };

  const handleError = () => {
    toast({
      title: 'Error!',
      description: 'An error occurred',
      status: 'error',
      position: 'top',
      duration: 4000,
      isClosable: true,
    });
  };

  const onSubmit = async (fieldsData: { title: string; description: string }) => {
    const data = { doc_id, ...fieldsData };
    const res = await editStandUp.mutateAsync(data);

    if (editStandUp?.isError) {
      handleError();
    } else {
      handleSuccess(doc_id);
      handleUpdateStandUp(res);
      onClose();
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent mx={3} py={5}>
          <ModalHeader>Write A StandUp</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                isRequired
                defaultValue={title}
                {...register('title', { required: { value: true, message: 'This field is required ' } })}
                type="text"
              />
              {errors?.title && <FormErrorMessage>This field is required</FormErrorMessage>}
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                isRequired
                defaultValue={description}
                {...register('description', { required: { value: true, message: 'This field is required ' } })}
              />
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
                colorScheme="green"
              >
                {editStandUp?.isPending ? (
                  <Flex gap={2}>
                    Update <Spinner size="sm" />
                  </Flex>
                ) : (
                  `Update`
                )}
              </Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
