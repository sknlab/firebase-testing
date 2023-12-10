import { Center, Spinner, Stack } from "@chakra-ui/react";

import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Stack w="100vw" h="100vh">
      <Center flexDir="column" maxW="1080px" w="100%" mx="auto">
        <Stack w="100%" h="4em">
          <Navbar />
        </Stack>
        <Stack w="100%" h="calc(100vh - 5em)">
          {children ? children : <Spinner />}
        </Stack>
      </Center>
    </Stack>
  );
}
