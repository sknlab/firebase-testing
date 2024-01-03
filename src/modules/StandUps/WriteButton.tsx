import { Button, Icon, Text, useDisclosure } from '@chakra-ui/react';

import { CreateStandUpModal } from '@/modules/StandUps/CreateModal';
import { FaAngleRight } from 'react-icons/fa';

export default function WriteButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button variant="ghost" alignItems="center" color="inherit" onClick={onOpen}>
        <Text fontSize="14px" fontWeight={400} letterSpacing={0.4} lineHeight="20px">
          Write
        </Text>
        <Icon as={FaAngleRight} />
      </Button>

      <CreateStandUpModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
