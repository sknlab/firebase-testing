import { Avatar, Flex, HStack, Icon, Menu, MenuButton, MenuItem, MenuList, Text, VStack, useToast } from '@chakra-ui/react';
import { FiChevronDown, FiLogOut, FiUser } from 'react-icons/fi';

import { AuthContext } from '@/context/AuthContext';
import { handleLogout } from '@/hooks/Auth.api';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfileButton() {
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
    <Flex alignItems="center">
      <Menu>
        <MenuButton>
          <Flex alignItems="center" gap={2}>
            <HStack gap={2} maxW={{ base: '8em', lg: '15em' }}>
              <Avatar src={user?.photoURL} />
              <VStack gap={1} align="start">
                <Text fontSize="12px" display={{ base: 'none', lg: 'flex' }} fontWeight={400} letterSpacing={0.4} lineHeight="18px">
                  Welcome,
                </Text>
                <Text fontSize="14px" fontWeight={400} letterSpacing={0.4} lineHeight="20px" textTransform="capitalize">
                  {user?.displayName}
                </Text>
              </VStack>
            </HStack>
            <FiChevronDown />
          </Flex>
        </MenuButton>

        <MenuList gap={2}>
          <MenuItem isDisabled onClick={() => navigate('/admin')}>
            <Flex w="100%" alignItems="center" justifyContent="space-between">
              <Text fontSize="14px" fontWeight={400} letterSpacing={0.4} lineHeight="20px">
                Profile
              </Text>
              <Icon as={FiUser} mx={1} />
            </Flex>
          </MenuItem>
          <MenuItem onClick={handleSignOut}>
            <Flex w="100%" alignItems="center" justifyContent="space-between">
              <Text fontSize="14px" fontWeight={400} letterSpacing={0.4} lineHeight="20px">
                Logout
              </Text>
              <Icon as={FiLogOut} mx={1} />
            </Flex>
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
