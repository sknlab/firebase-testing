import { Flex, Stack, Text, VStack } from '@chakra-ui/react';

import { AuthContext } from '@/context/AuthContext';
import Layout from '@/modules/Layout/Layout';
import { useContext } from 'react';

export default function Admin() {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <Layout>
      <Stack w={{ base: '98%', lg: '90%' }} mx="auto" background="#fafafa">
        <Flex w="100%">
          <Text fontSize="20px" fontWeight={500} letterSpacing={0.4} lineHeight="36px" textTransform="capitalize">
            Admin
          </Text>
        </Flex>
        <VStack>
          <Text> {user?.email} </Text>
          <Text> {user?.displayName} </Text>
        </VStack>
      </Stack>
    </Layout>
  );
}
