import { Avatar, Flex, HStack, Text, VStack } from '@chakra-ui/react';

import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';

export default function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <Flex alignItems="center">
      <HStack gap={2} w={{ base: '8em', lg: '15em' }}>
        <Avatar src={user?.photoURL}  />
        <VStack gap={1} align="start">
          <Text fontSize="12px" display={{ base: 'none', lg: 'flex' }} fontWeight={400} letterSpacing={0.4} lineHeight="18px">
            Welcome,
          </Text>
          <Text fontSize="14px" fontWeight={400} letterSpacing={0.4} lineHeight="20px" textTransform="capitalize">
            {user?.displayName}
          </Text>
        </VStack>
      </HStack>
    </Flex>
  );
}
