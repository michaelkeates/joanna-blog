//import Logo from './logo'
import NextLink from "next/link";
import React, { useState } from "react";
import {
  Container,
  Box,
  Link,
  Stack,
  Heading,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import ThemeToggleButton from "./theme-toggle-button";
import HomeButton from "./home-button";
import { IoLogoInstagram } from "react-icons/io5";

const Navbar = (props) => {
  const { path } = props;

  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={useColorModeValue('#f5f5f7', '#2d1965')}
      zIndex={999}
      {...props}
    >
      <Container
        display="flex"
        p={2}
        maxW="container.md"
        wrap="wrap"
        align="center"
        justify="space-between"
      >
        <Stack
          direction={{ base: "column", md: "row" }}
          display={{ base: "none", md: "flex" }}
          width={{ base: "full", md: "auto" }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
          p={2}
        >
          <NextLink p={2} href="/" path={path}>
            <HomeButton />
          </NextLink>
        </Stack>

        <Box flex={1} ml={1} align="right">
          <Box ml={2} display={{ base: "inline-block" }}>
            <ThemeToggleButton />
          </Box>

          <Box ml={2} display={{ base: "inline-block", md: "none" }}>
            <Menu isLazy id="navbar-menu">
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="outline"
                aria-label="Options"
                _focus={{ boxShadow: "none" }}
              />
              <MenuList
                bg="{useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}"
                css={{ backdropFilter: "blur(10px)" }}
              >
                <NextLink href="/index" passHref>
                  <MenuItem
                    bg="{useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}"
                    px={4}
                    py={2}
                    transition="all 0.2s"
                    _hover={{
                      bg: useColorModeValue("whiteAlpha.600", "whiteAlpha.300"),
                    }}
                    _expanded={{ bg: "blue.400" }}
                    _focus={{ boxShadow: "none" }}
                    as={Link}
                  >
                    Home
                  </MenuItem>
                </NextLink>
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
