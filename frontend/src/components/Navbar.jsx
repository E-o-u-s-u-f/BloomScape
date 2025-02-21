import {
  Container,
  HStack,
  Flex,
  Text,
  Button,
  Box,
  useColorMode,
  Input,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { IoMdChatboxes, IoMdMenu } from "react-icons/io";
import { useEffect, useState } from "react";
import Chat from "../pages/Chatpage";
import logo from "../assets/kkk[1].png";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenchat,
    onOpen: onOpenchat,
    onClose: onClosechat,
  } = useDisclosure();

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <Box>
      {/* Navbar */}
      <Box
        bg={colorMode === "light" ? "white" : "gray.800"}
        p={4}
        borderRadius="md"
        boxShadow="md"
      >
        <Container maxW="1500px" px={4}>
          <Flex h={16} alignItems="center" justifyContent="space-between">
            <HStack spacing={4} alignItems="center">
              <Button onClick={onOpen}>
                <IoMdMenu />
              </Button>
              <HStack spacing={2}>
                <img
                  src={logo}
                  alt="Logo"
                  style={{ height: "40px", width: "auto" }}
                />
                <Text
                  fontSize={{ base: "22", sm: "28" }}
                  fontWeight="bold"
                  textTransform="uppercase"
                  textAlign="center"
                  bgGradient="linear(to-r, teal.400, green.500, orange.300)"
                  bgClip="text"
                  color="teal.600"
                >
                  <Link to="/">BloomScape</Link>
                </Text>
              </HStack>
            </HStack>

            <Flex flex="1" justifyContent="center" mx={4}>
              <Input
                placeholder="Search..."
                size="lg"
                width={{ base: "90%", sm: "70%", md: "50%" }}
                variant="outline"
              />
            </Flex>

            <HStack spacing={4} alignItems="center">
              <Button
                onClick={onOpenchat}
                colorScheme="teal"
                variant="outline"
                width="auto"
              >
                <IoMdChatboxes size={20} />
              </Button>

              {user ? (
                <Menu>
                  <MenuButton as={Button} rounded="full" variant="link">
                    <Avatar name={user.name} src={user.profilePicture || ""} />
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => navigate("/ProfileCard")}>
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <>
                  <Link to="/signup">
                    <Button colorScheme="teal" variant="outline">
                      Sign Up
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button colorScheme="teal" variant="solid">
                      Log In
                    </Button>
                  </Link>
                </>
              )}

              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
              </Button>
            </HStack>
          </Flex>
        </Container>
      </Box>

      <Box
        bg="#C8E6C9"
        p={3}
        display="flex"
        justifyContent="center"
        borderTop="1px solid"
        borderBottom="1px solid"
        borderColor="gray.300"
      >
        <HStack spacing={6}>
          <Link to="/articles">
            <Button
              colorScheme="green"
              variant="ghost"
              fontWeight="bold"
              fontSize="1.2rem"
              borderRadius="md"
              _hover={{ bg: "green.200", transform: "scale(1.05)" }}
            >
              ARTICLES
            </Button>
          </Link>
          <Link to="/aboutus">
            <Button
              colorScheme="green"
              variant="ghost"
              fontWeight="bold"
              fontSize="1.2rem"
              borderRadius="md"
              _hover={{ bg: "green.200", transform: "scale(1.05)" }}
            >
              ABOUT US
            </Button>
          </Link>
          <Link to="/event">
            <Button
              colorScheme="green"
              variant="ghost"
              fontWeight="bold"
              fontSize="1.2rem"
              borderRadius="md"
              _hover={{ bg: "green.200", transform: "scale(1.05)" }}
            >
              EVENT
            </Button>
          </Link>
          <Link to="/resources">
            <Button
              colorScheme="green"
              variant="ghost"
              fontWeight="bold"
              fontSize="1.2rem"
              borderRadius="md"
              _hover={{ bg: "green.200", transform: "scale(1.05)" }}
            >
              RESOURCES
            </Button>
          </Link>
        </HStack>
      </Box>

      {isOpenchat && <Chat isOpen={isOpenchat} onClose={onClosechat} />}

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            <Link to="/create">
              <Button w="100%" mb={4}>
                Create
              </Button>
            </Link>
            <Link to="/admin">
              <Button w="100%" mb={4}>
                Admin
              </Button>
            </Link>
            <Link to="/signup">
              <Button w="100%" mb={4}>
                Sign Up
              </Button>
            </Link>
            <Link to="/login">
              <Button w="100%" mb={4}>
                Log In
              </Button>
            </Link>
          </DrawerBody>

          <DrawerFooter>
            <Button w="100%" onClick={toggleColorMode}>
              {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
