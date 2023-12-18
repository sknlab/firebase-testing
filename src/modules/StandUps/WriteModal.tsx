import { Button, Icon, Text, useDisclosure } from "@chakra-ui/react";

import { CreateArticleModal } from "@/modules/StandUps/CreateArticleModal";
import { FaAngleRight } from "react-icons/fa";

export default function WriteModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button variant="ghost" alignItems="center" color="inherit" onClick={onOpen}>
        <Text fontSize="14px" fontWeight={400} letterSpacing={0.4} lineHeight="20px">
          Write
        </Text>
        <Icon as={FaAngleRight} />
      </Button>

      <CreateArticleModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
