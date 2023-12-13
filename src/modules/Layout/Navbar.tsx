import {
  Avatar,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FiAtSign, FiEdit, FiHome, FiLogOut, FiMenu } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";


import { AuthContext } from "@/context/AuthContext";
import { handleLogout } from "@/hooks/Auth.api";
import { CreateArticleModal } from "@/modules/Blogs/CreateArticleModal";
import { useContext } from "react";


export default function Navbar() {
  const { user, dispatch } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
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

      <WriteModal />
      <MobileDrawer isOpen={isOpen} onClose={onClose} handleSignOut={handleSignOut} />

      <Flex alignItems="center" display={{ base: "none", lg: "flex" }}>
        {navItemsArray.map((item) => (
          <NavItemButton key={item?.id} icon={item?.icon} path={item?.path} text={item?.text} />
        ))}
        <Button variant="ghost" px={4} h="2em" onClick={handleSignOut}>
          <Text fontSize="14px" fontWeight={400} letterSpacing={0.4} lineHeight="20px">
            Logout
          </Text>
          <Icon as={FiLogOut} mx={1} />
        </Button>
      </Flex>

      <IconButton display={{ base: "flex", lg: "none" }} variant="outline" aria-label="open menu" icon={<FiMenu />} onClick={onOpen} />
    </Flex>
  );
}

const navItemsArray = [
  { id: 1, text: "All Blogs", icon: FiHome, path: "/" },
  { id: 2, text: "My Blogs", icon: FiAtSign, path: "/my-blogs" },
];

const NavItemButton = ({ icon, text, path, ...rest }: { icon: any; text: string; path: string }) => {
  return (
    <NavLink
      {...rest}
      to={path}
      style={({ isActive }) => {
        return {
          color: isActive ? "#3B82F6" : "inherit",
        };
      }}>
      <Button variant="ghost" gap={1} px={4} h="2em" color="inherit">
        <Icon as={icon} />
        <Text fontSize="14px" fontWeight={400} letterSpacing={0.4} lineHeight="20px" textTransform="uppercase">
          {text}
        </Text>
      </Button>
    </NavLink>
  );
};

const WriteModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button variant="ghost" px={4} h="2em" gap={1} onClick={onOpen}>
        <Text fontSize="14px" fontWeight={400} letterSpacing={0.4} lineHeight="20px">
          Write
        </Text>
        <Icon as={FiEdit} mr={1} />
      </Button>
      <CreateArticleModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

const MobileDrawer = ({ isOpen, onClose, handleSignOut }: { isOpen: boolean; onClose: () => void; handleSignOut: () => void }) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerBody>
          <VStack h="100%" w="100%" alignItems="start" pl={4} justifyContent="center" gap={4}>
            {navItemsArray.map((item) => (
              <NavItemButton key={item?.id} icon={item?.icon} path={item?.path} text={item?.text} />
            ))}

            <Button variant="ghost" onClick={handleSignOut}>
              <HStack gap={1}>
                <Text fontSize="14px" fontWeight={400} letterSpacing={0.4} lineHeight="20px">
                  Logout
                </Text>
                <Icon as={FiLogOut} mr={1} />
              </HStack>
            </Button>
          </VStack>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
