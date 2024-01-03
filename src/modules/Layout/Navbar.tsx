import { Button, Flex, Icon, Text, useToast } from '@chakra-ui/react';

import { AuthContext } from '@/context/AuthContext';
import { FiLogOut } from 'react-icons/fi';
import Profile from '@/modules/Layout/Profile';
import { handleLogout } from '@/hooks/Auth.api';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { user, dispatch } = useContext(AuthContext);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSignOut = () => {
    handleLogout().then(() => {
      dispatch({ type: 'LOGOUT' });
      toast({
        title: 'Log Out Success.',
        description: `Bye ${user?.displayName}. Sad to see you go.`,
        status: 'success',
        duration: 3000,
        position: 'top',
        isClosable: true,
      });
      navigate('/login');
    });
  };

  return (
    <Flex h="100%" w="100%" gap={4} alignItems="center" justifyContent="space-between" px={{ base: 2, lg: 46 }}>
      <Profile />
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
