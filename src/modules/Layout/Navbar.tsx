import { Avatar, Button, Flex, HStack, Icon, Text, VStack, useToast } from "@chakra-ui/react";
import { FiEdit, FiHome, FiLogOut } from "react-icons/fi";

import { AuthContext } from "../../context/AuthContext";
import { handleLogout } from "../../hooks/Auth";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, dispatch } = useContext(AuthContext);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSignOut = () => {
    handleLogout().then(() => {
      dispatch({ type: "LOGOUT" });
      toast({
        title: "Log Out Success.",
        description: `Bye ${user?.displayName}. Sad to see you go.`,
        status: "success",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      navigate("/login");
    });
  };

  return (
    <Flex h="100%" w="100%" gap={4} alignItems="center" justifyContent="space-between">
      <HStack gap={2}>
        <Avatar src={user?.photoURL} />
        <VStack gap={1} align="start">
          <Text fontSize="12px" fontWeight={400} letterSpacing={0.4} lineHeight="18px">
            Welcome,
          </Text>
          <Text fontSize="14px" fontWeight={400} letterSpacing={0.4} lineHeight="20px" textTransform="capitalize">
            {user?.displayName}
          </Text>
        </VStack>
      </HStack>

      <HStack gap={4}>
        <HStack gap={1}>
          <Text fontSize="14px" fontWeight={400} letterSpacing={0.4} lineHeight="20px">
            Home
          </Text>
          <Icon as={FiHome} />
        </HStack>
        <HStack>
          <Text fontSize="14px" fontWeight={400} letterSpacing={0.4} lineHeight="20px">
            Write
          </Text>
          <Icon as={FiEdit} mr={1} />
        </HStack>
      </HStack>

      <Button variant="ghost" onClick={handleSignOut}>
        <HStack gap={1}>
          <Text fontSize="14px" fontWeight={400} letterSpacing={0.4} lineHeight="20px">
            Logout
          </Text>
          <Icon as={FiLogOut} mr={1} />
        </HStack>
      </Button>
    </Flex>
  );
}
