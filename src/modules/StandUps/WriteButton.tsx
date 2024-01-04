import { Button, Icon, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";

export default function WriteModal() {
  return (
    <>
      <Button as={Link} variant="ghost" alignItems="center" color="inherit" to="create-stand-up">
        <Text fontSize="14px" fontWeight={400} letterSpacing={0.4} lineHeight="20px">
          Write
        </Text>
        <Icon as={FaAngleRight} />
      </Button>
    </>
  );
}
