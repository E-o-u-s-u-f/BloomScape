import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoArrowBackSharp } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import userConversation from "../Zustand/userConversation.js";
import { useSocketContext } from "../Context/SocketContext.jsx";
import {
  Box,
  Flex,
  Input,
  IconButton,
  Avatar,
  Text,
  VStack,
  HStack,
  Divider,
  Spinner,
  Badge,
} from "@chakra-ui/react";

const Sidebar = ({ onSelectUser }) => {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useAuth();
  const [searchInput, setSearchInput] = useState("");
  const [searchUser, setSearchUser] = useState([]);
  const [chatUser, setChatUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newMessageUsers, setNewMessageUsers] = useState({});
  const { setSelectedConversation } = userConversation();
  const { onlineUser, socket } = useSocketContext();

  // Handle new messages via socket
  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      setNewMessageUsers((prev) => ({
        ...prev,
        [newMessage.senderId]: (prev[newMessage.senderId] || 0) + 1,
      }));
    });
    return () => socket?.off("newMessage");
  }, [socket]);

  // Fetch current chatters
  useEffect(() => {
    const chatUserHandler = async () => {
      setLoading(true);
      try {
        const chatters = await axios.get("/api/user/currentchatters");
        setChatUser(chatters.data);
      } catch (error) {
        console.error("Error fetching chatters:", error);
        toast.error("Failed to load conversations");
      } finally {
        setLoading(false);
      }
    };
    chatUserHandler();
  }, []);

  // Handle search submission
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    setLoading(true);
    try {
      const search = await axios.get(`/api/user/search?search=${searchInput}`);
      const data = search.data;
      if (data.length === 0) {
        toast.info("User Not Found");
      }
      setSearchUser(data);
    } catch (error) {
      console.error("Error searching users:", error);
      toast.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  // Handle user selection
  const handleUserClick = (user) => {
    onSelectUser(user);
    setSelectedConversation(user);
    setSelectedUserId(user._id);
    setNewMessageUsers((prev) => ({ ...prev, [user._id]: 0 }));
  };

  // Reset search
  const handleSearchBack = () => {
    setSearchUser([]);
    setSearchInput("");
  };

  // Handle logout
  const handleLogOut = async () => {
    if (!authUser) {
      toast.error("User is not logged in.");
      return;
    }

    const confirmLogout = window.prompt("Type your username to LOGOUT");
    if (confirmLogout === authUser.fullName) {
      setLoading(true);
      try {
        await axios.post("/api/logout");
        toast.info("Logged out successfully");
        localStorage.removeItem("user");
        setAuthUser(null);
        navigate("/api/login");
      } catch (error) {
        console.error("Logout error:", error);
        toast.error("Logout failed");
      } finally {
        setLoading(false);
      }
    } else {
      toast.info("Logout Cancelled");
    }
  };

  return (
    <VStack
      spacing={4}
      h="full"
      p={4}
      bg="white"
      borderRadius="xl"
      boxShadow="md"
    >
      {/* Search and Profile */}
      <HStack w="full">
        <form onSubmit={handleSearchSubmit} style={{ flex: 1 }}>
          <HStack>
            <Input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search user"
              variant="outline"
              borderRadius="full"
              bg="gray.100"
            />
            <IconButton
              type="submit"
              icon={<FaSearch />}
              colorScheme="blue"
              borderRadius="full"
              aria-label="Search"
              isLoading={loading}
            />
          </HStack>
        </form>
        <Avatar
          src={authUser?.profilepic}
          size="md"
          cursor="pointer"
          onClick={() => navigate(`/profile/${authUser?._id}`)}
        />
      </HStack>

      <Divider />

      {/* User List or Search Results */}
      {searchUser.length > 0 ? (
        <VStack w="full" spacing={2} overflowY="auto" flex={1}>
          {searchUser.map((user) => (
            <HStack
              key={user._id}
              w="full"
              p={2}
              borderRadius="md"
              bg={selectedUserId === user._id ? "blue.100" : "transparent"}
              cursor="pointer"
              onClick={() => handleUserClick(user)}
            >
              <Avatar src={user.profilepic} size="sm" />
              <Text fontWeight="bold">{user.username}</Text>
            </HStack>
          ))}
          <IconButton
            icon={<IoArrowBackSharp />}
            onClick={handleSearchBack}
            colorScheme="gray"
            variant="outline"
            aria-label="Back to conversations"
          />
        </VStack>
      ) : (
        <VStack w="full" spacing={2} overflowY="auto" flex={1}>
          {loading ? (
            <Spinner size="lg" />
          ) : chatUser.length === 0 ? (
            <Text fontWeight="bold" textAlign="center" color="orange.500">
              No conversations yet. Search for users to start chatting!
            </Text>
          ) : (
            chatUser.map((user) => (
              <HStack
                key={user._id}
                w="full"
                p={2}
                borderRadius="md"
                bg={selectedUserId === user._id ? "blue.100" : "transparent"}
                cursor="pointer"
                onClick={() => handleUserClick(user)}
              >
                <Avatar src={user.profilepic} size="sm" />
                <Text fontWeight="bold">{user.username}</Text>
                {newMessageUsers[user._id] > 0 && (
                  <Badge colorScheme="green" borderRadius="full" px={2}>
                    {newMessageUsers[user._id]}
                  </Badge>
                )}
                {onlineUser.includes(user._id) && (
                  <Badge colorScheme="blue">Online</Badge>
                )}
              </HStack>
            ))
          )}
        </VStack>
      )}

      {/* Logout */}
      <HStack w="full" justify="flex-start">
        <IconButton
          icon={<BiLogOut />}
          onClick={handleLogOut}
          colorScheme="red"
          variant="outline"
          aria-label="Logout"
          isLoading={loading}
        />
        <Text>Logout</Text>
      </HStack>
    </VStack>
  );
};

export default Sidebar;
