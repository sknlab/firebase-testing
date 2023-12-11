import { Button, Center, Icon, Stack, Text, useToast } from "@chakra-ui/react";

import { AuthContext } from "../../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { handleAuthentication } from "../../hooks/Auth.api";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { dispatch } = useContext(AuthContext);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSuccessAuth = (displayName: string | null | undefined) => {
    toast({
      title: "Login Success.",
      description: `Welcome ${displayName}`,
      status: "success",
      duration: 3000,
      position: "top",
      isClosable: true,
    });
  };

  const handleErrorAuth = (error: string | null | undefined) => {
    toast({
      title: "Login Failed.",
      description: `${error}`,
      status: "error",
      duration: 4000,
      position: "top",
      isClosable: true,
    });
  };

  const handleLogin = () => {
    handleAuthentication()
      .then((res) => {
        dispatch({ type: "LOGIN_SUCCESS", payload: res?.user });
        handleSuccessAuth(res?.user?.displayName);
        navigate("/");
      })
      .catch((err) => handleErrorAuth(err));
  };

  return (
    <Stack h="100vh" w="100vw">
      <Center flexDir="column" alignContent={"center"} justifyContent={"center"} h="100%">
        <Icon as={FcGoogle} h="5em" w="5em" border="1px" m={2} p={2} borderColor="gray.400" borderRadius="50%" />
        <Button
          onClick={handleLogin}
          m={2}
          gap={2}
          alignItems="center"
          w="17em"
          h="2.5em"
          border="1px"
          variant="ghost"
          borderColor="black"
          borderRadius={24}
          justifyContent="space-between">
          <Icon as={FcGoogle} h="1.5em" w="1.5em" />
          <Text w="90%" textTransform="capitalize">
            sign in with google
          </Text>
        </Button>
      </Center>
    </Stack>
  );
}
