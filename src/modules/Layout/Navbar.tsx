import { Flex, Text } from '@chakra-ui/react';

import { Link } from 'react-router-dom';
import ProfileButton from '@/modules/Layout/ProfileButton';

export default function Navbar() {
  return (
    <Flex h="100%" w="100%" gap={4} alignItems="center" justifyContent="space-between" px={{ base: 2, lg: 46 }}>
      <Link to="/" >
      <Text fontSize="24px" fontWeight={700} letterSpacing={0.4} lineHeight="36px" textTransform="capitalize">
        engineering team
        </Text>
      </Link>
      <ProfileButton />
    </Flex>
  );
}
