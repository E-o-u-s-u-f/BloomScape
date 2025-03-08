import React, { useEffect, useState } from "react";
import { Box, Flex, Divider } from "@chakra-ui/react";
import Sidebar from "./Sidebar.jsx";
import MessageContainer from "./MessageContainer.jsx";

const Chat = ({ isOpen, onClose }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleShowSidebar = () => {
    setSelectedUser(null);
  };

  useEffect(() => {
    if (!isOpen) {
      setSelectedUser(null);
    }
  }, [isOpen]);

  return (
    <Flex
      justify="space-between"
      minW="full"
      direction={{ base: "column", md: "row" }}
      px={2}
      h={{ base: "95%", md: "full" }}
      rounded="xl"
      boxShadow="lg"
      bg="rgba(160, 174, 192, 0.4)" // Semi-transparent gray for glassmorphism
      backdropFilter="blur(8px)"
    >
      {/* Sidebar */}
      <Box
        w={{ base: "full", md: "300px" }}
        py={2}
        px={4}
        bg="whiteAlpha.800" // Semi-transparent white background
        display={{ base: selectedUser ? "none" : "block", md: "block" }}
      >
        <Sidebar onSelectUser={handleUserSelect} />
      </Box>

      {/* Divider */}
      {selectedUser && (
        <Divider
          orientation="vertical"
          display={{ base: "none", md: "block" }}
          px={3}
        />
      )}

      {/* Message Container */}
      {selectedUser && (
        <Box flex="1" bg="gray.50" p={4}>
          <MessageContainer
            onBackUser={handleShowSidebar}
            selectedUser={selectedUser}
          />
        </Box>
      )}
    </Flex>
  );
};

export default Chat;
