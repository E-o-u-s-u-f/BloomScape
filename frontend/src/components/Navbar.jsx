import {
  Container,
  HStack,
  Flex,
  Button,
  Box,
  useColorMode,
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
import axios from "axios"; // Add axios for fetching user
import Chat from "../Chat/Chatpage";
import logo from "../assets/kkk[1].png";
import SearchBox from "../components/SearchBox";
const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenchat,
    onOpen: onOpenchat,
    onClose: onClosechat,
  } = useDisclosure();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/profile", {
          withCredentials: true, // Send jwt cookie
        });
        console.log("Navbar user response:", response.data); // Debug
        if (response.data.success && response.data.user) {
          setUser(response.data.user); // { fullName, role }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error(
          "Error fetching user in Navbar:",
          error.response?.data || error.message
        );
        setUser(null); // Clear user on error (e.g., not logged in)
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    axios
      .post("http://localhost:5000/api/logout", {}, { withCredentials: true })
      .then(() => {
        setUser(null); // Clear user state
        navigate("/login"); // Redirect to login
      })
      .catch((error) => console.error("Logout error:", error));
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
              <Button onClick={onOpen} variant="ghost">
                <IoMdMenu size={24} />
              </Button>
              <Link to="/">
                <Box
                  as="img"
                  src={logo}
                  alt="BloomScape Logo"
                  height="75px"
                  width="250px"
                  objectFit="contain"
                  transition="all 0.2s"
                  _hover={{ transform: "scale(1.05)" }}
                  mt={4}
                />
              </Link>
            </HStack>

            <Flex flex="1" justifyContent="center" mx={4}>
              <SearchBox />
            </Flex>

            <HStack spacing={4} alignItems="center">
              <Link to="/chat">
                <Button
                  onClick={onOpenchat}
                  colorScheme="teal"
                  variant="outline"
                  size="md"
                  _hover={{ transform: "scale(1.05)" }}
                >
                  <IoMdChatboxes size={20} />
                </Button>
              </Link>

              {user ? (
                <Menu>
                  <MenuButton as={Button} rounded="full" variant="link">
                    <Avatar
                      name={user.fullName} // Use fullName from backend
                      src={user.profilePicture || ""}
                      size="md"
                      transition="all 0.2s"
                      _hover={{ transform: "scale(1.05)" }}
                    />
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => navigate("/profile")}>
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <>
                  <Link to="/signup">
                    <Button
                      colorScheme="teal"
                      variant="outline"
                      size="md"
                      _hover={{ transform: "scale(1.05)" }}
                    >
                      Sign Up
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button
                      colorScheme="teal"
                      variant="solid"
                      size="md"
                      _hover={{ transform: "scale(1.05)" }}
                    >
                      Log In
                    </Button>
                  </Link>
                </>
              )}

              <Button
                onClick={toggleColorMode}
                variant="ghost"
                size="md"
                _hover={{ transform: "scale(1.05)" }}
              >
                {colorMode === "light" ? (
                  <IoMoon size={20} />
                ) : (
                  <LuSun size={20} />
                )}
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
              variant="ghost"
              color="green.700"
              bg="transparent"
              fontWeight="bold"
              fontSize="1.2rem"
              borderRadius="md"
              _hover={{ bg: "green.200", transform: "scale(1.05)" }}
              _active={{ bg: "green.300" }}
            >
              ARTICLES
            </Button>
          </Link>
          <Link to="/aboutus">
            <Button
              variant="ghost"
              color="green.700"
              bg="transparent"
              fontWeight="bold"
              fontSize="1.2rem"
              borderRadius="md"
              _hover={{ bg: "green.200", transform: "scale(1.05)" }}
              _active={{ bg: "green.300" }}
            >
              ABOUT US
            </Button>
          </Link>
          <Link to="/event">
            <Button
              variant="ghost"
              color="green.700"
              bg="transparent"
              fontWeight="bold"
              fontSize="1.2rem"
              borderRadius="md"
              _hover={{ bg: "green.200", transform: "scale(1.05)" }}
              _active={{ bg: "green.300" }}
            >
              EVENT
            </Button>
          </Link>
          <Link to="/resources">
            <Button
              variant="ghost"
              color="green.700"
              bg="transparent"
              fontWeight="bold"
              fontSize="1.2rem"
              borderRadius="md"
              _hover={{ bg: "green.200", transform: "scale(1.05)" }}
              _active={{ bg: "green.300" }}
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
              <Button
                w="100%"
                mb={4}
                colorScheme="teal"
                variant="outline"
                _hover={{ transform: "scale(1.05)" }}
              >
                Create
              </Button>
            </Link>
            {user &&
              user.role === "admin" && ( // Only show Admin for admins
                <Link to="/admin">
                  <Button
                    w="100%"
                    mb={4}
                    colorScheme="teal"
                    variant="outline"
                    _hover={{ transform: "scale(1.05)" }}
                  >
                    Admin
                  </Button>
                </Link>
              )}
          </DrawerBody>

          <DrawerFooter>
            <Button
              w="100%"
              onClick={toggleColorMode}
              variant="ghost"
              _hover={{ transform: "scale(1.05)" }}
            >
              {colorMode === "light" ? <IoMoon /> : <LuSun size={20} />}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
