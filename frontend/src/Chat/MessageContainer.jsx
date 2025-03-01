import React, { useEffect, useState, useRef } from 'react';
import { Box, Flex, Text, Avatar, IconButton, Spinner, Input, Button } from '@chakra-ui/react';
import { IoArrowBackSharp } from 'react-icons/io5';
import { IoSend } from 'react-icons/io5';
import { TiMessages } from 'react-icons/ti';
import axios from 'axios';
import { useSocketContext } from '../Context/SocketContext.jsx';
import notify from '../assets/notification.mp3';
import userConversation from '../Zustand/userConversation.js';
import { useAuth } from '../Context/AuthContext.jsx';

const MessageContainer = ({ onBackUser }) => {
  const { messages, selectedConversation, setMessage, setSelectedConversation } = userConversation();
  const { socket } = useSocketContext();
  const { authUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendData, setSendData] = useState('');
  const lastMessageRef = useRef();

  // Handle new incoming messages
  useEffect(() => {
    socket?.on('newMessage', (newMessage) => {
      const sound = new Audio(notify);
      sound.play();
      // Append new message to the message state
      setMessage((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => socket?.off('newMessage');
  }, [socket, setMessage]);

  // Scroll to the last message
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, [messages]);

  // Fetch messages on selected conversation change
  useEffect(() => {
    const getMessages = async () => {
      if (selectedConversation?._id) {
        setLoading(true);
        try {
          const response = await axios.get(`/api/message/${selectedConversation._id}`);
          const data = await response.data;
          if (data.success === false) {
            console.log(data.message);
          } else {
            setMessage(data.messages);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };

    getMessages();
  }, [selectedConversation, setMessage]);

  // Handle message input change
  const handleMessageChange = (e) => {
    setSendData(e.target.value);
  };

  // Handle message send
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const response = await axios.post(`/api/message/send/${selectedConversation._id}`, { message: sendData });
      const data = await response.data;
      if (data.success === false) {
        console.log(data.message);
      } else {
        // Once the message is successfully sent, clear the input and append the message
        setMessage((prevMessages) => [...prevMessages, data.message]);
        setSendData('');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSending(false);
    }
  };

  return (
    <Box minW="500px" h="99%" display="flex" flexDir="column" py={2}>
      {selectedConversation === null ? (
        <Flex justify="center" align="center" w="full" h="full">
          <Box textAlign="center" px={4} fontSize="2xl" color="gray.950" fontWeight="semibold">
            <Text fontSize="2xl">Welcome!!👋 {authUser.username}😉</Text>
            <Text fontSize="lg">Select a chat to start messaging</Text>
            <TiMessages fontSize="6xl" />
          </Box>
        </Flex>
      ) : (
        <>
          <Flex justify="space-between" align="center" bg="sky.600" borderRadius="lg" h="12" p={2}>
            <Flex gap={2} w="full" justify="space-between">
              <Box display={{ base: 'block', md: 'none' }} ml={1}>
                <IconButton
                  icon={<IoArrowBackSharp size={25} />}
                  aria-label="Back"
                  bg="white"
                  borderRadius="full"
                  onClick={() => onBackUser(true)}
                />
              </Box>
              <Flex align="center" gap={2}>
                <Avatar src={selectedConversation?.profilepic} size="sm" />
                <Text fontSize={{ base: 'sm', md: 'xl' }} fontWeight="bold" color="gray.950">
                  {selectedConversation?.username}
                </Text>
              </Flex>
            </Flex>
          </Flex>

          <Box flex="1" overflow="auto" p={2}>
            {loading ? (
              <Flex w="full" h="full" justify="center" align="center" gap={4}>
                <Spinner />
              </Flex>
            ) : messages.length === 0 ? (
              <Text textAlign="center" color="white">
                Send a message to start Conversation
              </Text>
            ) : (
              messages.map((message) => (
                <Box key={message._id} ref={lastMessageRef} mb={2}>
                  <Flex justify={message.senderId === authUser._id ? 'flex-end' : 'flex-start'} align="center">
                    <Box>
                      <Box
                        bg={message.senderId === authUser._id ? 'sky.600' : 'gray.300'}
                        color="white"
                        borderRadius="md"
                        p={2}
                      >
                        {message.message}
                      </Box>
                      <Text fontSize="xs" color="gray.500" textAlign="right">
                        {new Date(message.createdAt).toLocaleDateString('en-IN')}
                        {` ${new Date(message.createdAt).toLocaleTimeString('en-IN', {
                          hour: 'numeric',
                          minute: 'numeric',
                        })}`}
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              ))
            )}
          </Box>

          <form onSubmit={handleSubmit}>
            <Flex align="center" bg="white" borderRadius="full" p={2}>
              <Input
                value={sendData}
                onChange={handleMessageChange}
                id="message"
                type="text"
                required
                borderRadius="full"
                bg="transparent"
                border="none"
                px={4}
              />
              <Button
                type="submit"
                variant="link"
                aria-label="Send Message"
                isLoading={sending}
                loadingText="Sending"
              >
                <IoSend size={25} color="sky.700" />
              </Button>
            </Flex>
          </form>
        </>
      )}
    </Box>
  );
};

export default MessageContainer;
