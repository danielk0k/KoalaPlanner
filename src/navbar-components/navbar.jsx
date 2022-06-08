import React from "react";
import { Link } from "react-router-dom";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";
import {
  CalendarIcon,
  SettingsIcon,
  ArrowForwardIcon,
  HamburgerIcon,
  InfoOutlineIcon,
} from "@chakra-ui/icons";

const LinkItems = [
  { name: "Profile", icon: <InfoOutlineIcon />, url: "/app/profile" },
  { name: "Board", icon: <CalendarIcon />, url: "/app/board" },
  { name: "Settings", icon: <SettingsIcon />, url: "/app/settings" },
  { name: "Logout", icon: <ArrowForwardIcon />, url: "/app/signout" },
];

export default function Navbar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh">
      <SidebarContent
        onClose={onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} display={{ base: "flex", md: "none" }} />
      <Box ml={{ base: 0, md: 60 }} p={3} pl={10}>
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      backgroundColor="#FFFFFF"
      boxShadow="lg"
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="bold">
          Koala Planner
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem item={link} />
      ))}
    </Box>
  );
};

const NavItem = ({ item }) => {
  return (
    <Link to={item.url}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "#34495E",
          color: "#FFFFFF",
        }}
      >
        <HStack spacing={4}>
          {item.icon}
          <Text>{item.name}</Text>
        </HStack>
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      backgroundColor="#FFFFFF"
      boxShadow="lg"
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<HamburgerIcon />}
      />

      <Text fontSize="2xl" ml="8" fontWeight="bold">
        Koala Planner
      </Text>
    </Flex>
  );
};
