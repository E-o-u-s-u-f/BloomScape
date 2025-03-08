import React, { useEffect, useState, useRef } from "react";
import userConversation from "../Zustand/userConversation.js";
import { useAuth } from "../Context/AuthContext.jsx";
import { TiMessages } from "react-icons/ti";
import { IoArrowBackSharp, IoSend } from "react-icons/io5";
import axios from "axios";
import { useSocketContext } from "../Context/SocketContext.jsx";
import notify from "../assets/notification.mp3";
import {
  Box,
  Flex,
  Text,
  Input,
  Avatar,
  Spinner,
  IconButton,
  VStack,
  HStack,
  Divider,
  Badge,
} from "@chakra-ui/react";

const MessageContainer = ({ onBackUser }) => {
  const {
    messages = [],
    selectedConversation,
    setMessage,
  } = userConversation();
  const { socket } = useSocketContext();
  const { authUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendData, setSendData] = useState("");
  const [typing, setTyping] = useState(false);
  const lastMessageRef = useRef();
  const inputRef = useRef();

  // Real-time message listener
  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      const sound = new Audio(notify);
      sound.play();
      setMessage((prevMessages) => [...prevMessages, newMessage]);
    };

    socket?.on("newMessage", handleNewMessage);
    return () => socket?.off("newMessage", handleNewMessage);
  }, [socket, setMessage]);

  // Typing indicator listener
  useEffect(() => {
    const handleTyping = () => setTyping(true);
    const handleStopTyping = () => setTyping(false);

    socket?.on("typing", handleTyping);
    socket?.on("stopTyping", handleStopTyping);

    return () => {
      socket?.off("typing", handleTyping);
      socket?.off("stopTyping", handleStopTyping);
    };
  }, [socket]);

  // Fetch messages for the selected conversation
  useEffect(() => {
    if (selectedConversation?._id) {
      const getMessages = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `/api/massage/${selectedConversation._id}`
          );
          const data = response.data;
          setLoading(false);
          setMessage(Array.isArray(data) ? data : []);
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      };
      getMessages();
    }
  }, [selectedConversation?._id, setMessage]);

  // Auto-scroll to the latest message
  useEffect(() => {
    lastMessageRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle input changes and emit typing events
  const handleMessages = (e) => {
    setSendData(e.target.value);
    if (e.target.value) {
      socket?.emit("typing", selectedConversation._id);
    } else {
      socket?.emit("stopTyping", selectedConversation._id);
    }
  };

  // Handle message submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sendData.trim()) return;
    setSending(true);
    try {
      const sound = new Audio(notify);
      sound.play();
      const response = await axios.post(
        `/api/massage/send/${selectedConversation._id}`,
        {
          massage: sendData,
        }
      );
      const data = response.data;
      setMessage((prevMessages) => [
        ...prevMessages,
        { ...data.massage, status: "sent" },
      ]);
      setSendData("");
      socket?.emit("stopTyping", selectedConversation._id);
    } catch (error) {
      console.log(error);
    } finally {
      setSending(false);
    }
  };

  return (
    <VStack spacing={0} h="full" w="full" bg="gray.50" borderRadius="xl">
      {/* Header */}
      {selectedConversation ? (
        <HStack w="full" p={4} bg="blue.500" color="white" borderTopRadius="xl">
          <IconButton
            icon={<IoArrowBackSharp />}
            onClick={() => onBackUser(true)}
            variant="ghost"
            colorScheme="whiteAlpha"
            display={{ base: "flex", md: "none" }}
            aria-label="Back to conversations"
          />
          <Avatar src={selectedConversation.profilepic} size="sm" />
          <Text fontWeight="bold">{selectedConversation.username}</Text>
        </HStack>
      ) : (
        <VStack flex={1} justify="center" align="center" color="gray.500">
          <TiMessages size={100} />
          <Text fontSize="xl" fontWeight="bold">
            Select a chat to start messaging
          </Text>
          <Text>Welcome, {authUser.username}!</Text>
        </VStack>
      )}

      {/* Messages */}
      {selectedConversation && (
        <Box flex={1} w="full" overflowY="auto" p={4}>
          {loading ? (
            <Flex justify="center" align="center" h="full">
              <Spinner size="xl" />
            </Flex>
          ) : messages.length === 0 ? (
            <Text textAlign="center" color="gray.500">
              Send a message to start the conversation
            </Text>
          ) : (
            messages.map((message) => (
              <HStack
                key={message._id}
                justify={
                  message.senderId === authUser._id ? "flex-end" : "flex-start"
                }
                my={2}
              >
                <Box
                  bg={
                    message.senderId === authUser._id ? "blue.100" : "gray.100"
                  }
                  p={3}
                  borderRadius="lg"
                  maxW="70%"
                >
                  <Text>{message.massage}</Text>
                  <HStack justify="space-between" mt={1}>
                    <Text fontSize="xs" color="gray.500">
                      {new Date(message.createdAt).toLocaleString("en-IN", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </Text>
                    {message.senderId === authUser._id && (
                      <Badge
                        colorScheme={
                          message.status === "sent" ? "green" : "gray"
                        }
                        fontSize="xs"
                      >
                        {message.status}
                      </Badge>
                    )}
                  </HStack>
                </Box>
              </HStack>
            ))
          )}
          {typing && (
            <Text fontSize="sm" color="gray.500" mt={2}>
              {selectedConversation.username} is typing...
            </Text>
          )}
          <div ref={lastMessageRef} />
        </Box>
      )}

      {/* Input Form */}
      {selectedConversation && (
        <Box w="full" p={4} bg="white" borderBottomRadius="xl">
          <form onSubmit={handleSubmit}>
            <HStack>
              <Input
                ref={inputRef}
                value={sendData}
                onChange={handleMessages}
                placeholder="Type a message"
                variant="outline"
                bg="white"
                borderRadius="full"
                aria-label="Message input"
              />
              <IconButton
                type="submit"
                icon={sending ? <Spinner size="sm" /> : <IoSend />}
                colorScheme="blue"
                borderRadius="full"
                isDisabled={sending || !sendData.trim()}
                aria-label="Send message"
              />
            </HStack>
          </form>
        </Box>
      )}
    </VStack>
  );
};

export default MessageContainer;
