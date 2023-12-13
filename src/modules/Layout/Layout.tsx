import { Center, Stack } from "@chakra-ui/react";

import LoadingSpinner from "@/components/Spinner/LoadingSpinner";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Stack w="100vw" h="100vh">
      <Center flexDir="column" maxW="1080px" w="100%" mx="auto">
        <Stack w="inherit" h="6em" px={4} position="sticky" top="0" zIndex={10} bg="white">
          <Navbar />
        </Stack>
        <Stack w="inherit" minH="calc(100vh - 6.2em)" overflowY="scroll" p={4}>
          {children ? children : <LoadingSpinner />}
        </Stack>
      </Center>
    </Stack>
  );
}
