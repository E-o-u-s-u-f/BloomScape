import { useState } from "react";
import { Button, Flex, Input, useColorMode } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon } from "@chakra-ui/icons";

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate(); 
  const { colorMode } = useColorMode(); // Get current color mode

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate(`/`);
    }
  };

  return (
    <Flex
      as="form"
      onSubmit={submitHandler}
      justify="center"
      align="center"
      flexDirection="row"
      width="100%"
      p={4}
    >
      <Input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Posts..."
        border="2px solid"
        size="lg"
        width={{ base: "90%", sm: "70%", md: "50%" }}
        variant="outline"
        mr={4}
        bg={colorMode === "light" ? "white" : "gray.700"} // Adjust input background color
        color={colorMode === "light" ? "black" : "white"} // Adjust text color
        _placeholder={{ color: colorMode === "light" ? "gray.500" : "gray.300" }} // Adjust placeholder color
      />
      <Button 
        type="submit" 
        variant="outline" 
        size="lg" 
        colorScheme="teal"
        border="2px solid"
        borderColor="teal.500"
        bg={colorMode === "light" ? "white" : "gray.700"} // Adjust button background
        color={colorMode === "light" ? "teal.600" : "teal.300"} // Adjust icon color
        _hover={{
          bg: colorMode === "light" ? "gray.100" : "gray.600"
        }}
      >
        <SearchIcon />
      </Button>
    </Flex>
  );
};

export default SearchBox;
