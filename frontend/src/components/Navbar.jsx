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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import logo from "../assets/kkk[1].png";
import { IoMdChatboxes } from "react-icons/io";
import { useState } from "react";  
import Chat from "../pages/Chatpage";
import { IoMdMenu } from "react-icons/io";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenchat, onOpen: onOpenchat, onClose: onClosechat } = useDisclosure();

  return (
    <Box
      bg={colorMode === "light" ? "white" : "gray.800"} 
      p={4} 
      borderRadius="md" 
      boxShadow="md"
    >
      <Container 
           maxW={"1500px"} //if it is too big for u then swap maxW={{ base: "100%", sm: "95%", md: "90%", lg: "85%", xl: "80%", "2xl": "75%" }} 
            px={4}>
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <HStack spacing={4} alignItems="center">
            <Button onClick={onOpen}><IoMdMenu/></Button> 
            <HStack spacing={2}>
              <img
                src={logo}
                alt="Logo"
                style={{ height: "40px", width: "auto" }}
              />
              <Text
                fontSize={{ base: "22", sm: "28" }}
                fontWeight={"bold"}
                textTransform={"uppercase"}
                textAlign={"center"}
                bgGradient={"linear(to-r, teal.400, green.500, orange.300)"}
                bgClip={"text"}
                color="teal.600"
              >
                <Link to={"/"}>BloomScape</Link>
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

          <HStack spacing={4} alignItems={"center"}> 
          <Button onClick={onOpenchat} colorScheme="teal" variant="outline" width="auto">
              <IoMdChatboxes size={20}/>
            </Button>
            <Link to="/signup">
              <Button colorScheme="teal" variant="outline" width="auto">
                Sign Up
              </Button>
            </Link>
            <Link to="/login">
              <Button colorScheme="teal" variant="solid" width="auto">
                Log In
              </Button>
            </Link>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
            </Button>
          </HStack> 
        </Flex>
      </Container>
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
