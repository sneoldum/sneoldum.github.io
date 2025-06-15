import React from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { HamburgerIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
import Logo from "../../atoms/Logo";
import NavMenu from "../../molecules/Navigation";

const MotionBox = motion(Box);

const navigationItems = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const { scrollY } = useScroll();

  // Header background changes on scroll
  const headerBg = useColorModeValue(
    "rgba(255, 255, 255, 0.8)",
    "rgba(26, 32, 44, 0.8)"
  );
  const headerBgScrolled = useColorModeValue(
    "rgba(255, 255, 255, 0.95)",
    "rgba(26, 32, 44, 0.95)"
  );

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    [headerBg, headerBgScrolled]
  );

  const boxShadow = useTransform(
    scrollY,
    [0, 100],
    ["none", "0 4px 12px rgba(0, 0, 0, 0.15)"]
  );

  return (
    <>
      <MotionBox
        as="header"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex="sticky"
        style={{ backgroundColor, boxShadow }}
        backdropFilter="blur(20px)"
        borderBottom="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Box maxW="container.xl" mx="auto" px={6}>
          <Flex h={16} alignItems="center" justifyContent="space-between">
            {/* Logo */}
            <Box as={RouterLink} to="/">
              <Logo size="md" />
            </Box>

            {/* Desktop Navigation */}
            <HStack spacing={8} display={{ base: "none", md: "flex" }}>
              <NavMenu items={navigationItems} />
            </HStack>

            {/* Right side - Color mode toggle + Mobile menu */}
            <HStack spacing={4}>
              {/* Color Mode Toggle */}
              <IconButton
                aria-label="Toggle color mode"
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
                variant="ghost"
                size="md"
                _hover={{
                  bg: useColorModeValue("gray.100", "gray.700"),
                  transform: "rotate(180deg)",
                }}
                transition="all 0.3s"
              />

              {/* Mobile Menu Button */}
              <IconButton
                aria-label="Open navigation menu"
                icon={<HamburgerIcon />}
                onClick={onOpen}
                variant="ghost"
                size="md"
                display={{ base: "flex", md: "none" }}
                _hover={{
                  bg: useColorModeValue("gray.100", "gray.700"),
                }}
              />
            </HStack>
          </Flex>
        </Box>
      </MotionBox>

      {/* Mobile Navigation Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Logo size="sm" />
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={6} align="stretch" mt={8}>
              <NavMenu
                items={navigationItems}
                direction="vertical"
                onClick={onClose}
              />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
