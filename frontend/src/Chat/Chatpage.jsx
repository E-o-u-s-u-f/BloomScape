import React, { useEffect, useState } from 'react';
import { Box, Flex, Divider } from '@chakra-ui/react';
import Sidebar from './Sidebar.jsx';
import MessageContainer from './MessageContainer.jsx';

const Chat = ({ isOpen, onClose }) => { // Accepting props

  const [selectedUser, setSelectedUser] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const handelUserSelect = (user) => {
    setSelectedUser(user);
    setIsSidebarVisible(false);  // Hide sidebar when a user is selected
  };

  const handelShowSidebar = () => {
    setIsSidebarVisible(true);   // Show sidebar again
    setSelectedUser(null);       // Reset selected user
  };

  useEffect(() => {
    if (!isOpen) {
      setIsSidebarVisible(true);  // When chat modal is closed, show sidebar
      setSelectedUser(null);      // Reset selected user
    }
  }, [isOpen]);  // Dependency on isOpen to handle side effects when isOpen changes

  return (
    <Flex
      justify="space-between"
      minW="full"
      direction={{ base: 'column', md: 'row' }}
      px={2}
      h={{ base: '95%', md: 'full' }}
      rounded="xl"
      boxShadow="lg"
      bg="gray.400"
      bgClip="padding-box"
      backdropFilter="blur(8px)"
      bgopacity={0.4}
    >
      {/* Sidebar */}
      <Box
        w="full"
        py={2}
        display={{ base: 'none', md: isSidebarVisible ? 'block' : 'none' }}
      >
        <Sidebar onSelectUser={handelUserSelect} />
      </Box>

      {/* Divider */}
      <Divider
        orientation="vertical"
        display={{ base: 'none', md: isSidebarVisible && selectedUser ? 'block' : 'none' }}
        px={3}
      />

      {/* Message Container */}
      <Box
        flex="1"
        bg="gray.200"
        display={selectedUser ? 'block' : { base: 'none', md: 'flex' }}
      >
        <MessageContainer onBackUser={handelShowSidebar} />
      </Box>
    </Flex>
  );
};

export default Chat;
