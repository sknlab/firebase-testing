import { Avatar, Button, Flex, HStack, Icon, Text, VStack, useToast } from "@chakra-ui/react";

import { AuthContext } from "@/context/AuthContext";
import { handleLogout } from "@/hooks/Auth.api";
import { useContext } from "react";
import { FiLogOut } from "react-icons/fi";
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
    <Flex h="100%" w="100%" gap={4} alignItems="center" justifyContent="space-between" px={{ base: 2, lg: 46 }}>
      <Flex alignItems="center">
        <HStack gap={2} w={{ base: "8em", lg: "15em" }}>
          <Avatar src={user?.photoURL} />
          <VStack gap={1} align="start">
            <Text fontSize="12px" display={{ base: "none", lg: "flex" }} fontWeight={400} letterSpacing={0.4} lineHeight="18px">
              Welcome,
            </Text>
            <Text fontSize="14px" fontWeight={400} letterSpacing={0.4} lineHeight="20px" textTransform="capitalize">
              {user?.displayName}
            </Text>
          </VStack>
        </HStack>
      </Flex>

      <Flex alignItems="center">
        <Button variant="ghost" px={4} h="2em" onClick={handleSignOut}>
          <Text fontSize="14px" fontWeight={400} letterSpacing={0.4} lineHeight="20px">
            Logout
          </Text>
          <Icon as={FiLogOut} mx={1} />
        </Button>
      </Flex>
    </Flex>
  );
}
