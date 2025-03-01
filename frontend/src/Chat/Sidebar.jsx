import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../Context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackSharp } from 'react-icons/io5';
import { BiLogOut } from 'react-icons/bi';
import userConversation from '../Zustand/userConversation.js';
import { useSocketContext } from '../Context/SocketContext.jsx';
import { Box, Button, Input, Avatar, Text, Divider, Flex, IconButton, VStack } from '@chakra-ui/react';

const Sidebar = ({ onSelectUser }) => {
    const navigate = useNavigate();
    const { authUser, setAuthUser } = useAuth();
    const [searchInput, setSearchInput] = useState('');
    const [searchUser, setSearchUser] = useState([]);
    const [chatUser, setChatUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [newMessageUsers, setNewMessageUsers] = useState(null);
    
    // Get data from Zustand hook userConversation
    const { messages = [], setMessage, selectedConversation, setSelectedConversation } = userConversation() || {};
    const { onlineUser, socket } = useSocketContext();

    const nowOnline = chatUser.map((user) => user._id);
    const isOnline = nowOnline.map((userId) => onlineUser.includes(userId));

    // Listen for new messages from socket
    useEffect(() => {
        socket?.on('newMessage', (newMessage) => {
            setNewMessageUsers(newMessage);
        });
        return () => socket?.off('newMessage');
    }, [socket]);

    // Fetch chat users data
    useEffect(() => {
        const chatUserHandler = async () => {
            setLoading(true);
            try {
                const chatters = await axios.get('/api/user/currentchatters');
                const data = chatters.data;
                if (data.success === false) {
                    setLoading(false);
                    console.log(data.message);
                } else {
                    setChatUser(data);
                }
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
            setLoading(false);
        };
        chatUserHandler();
    }, []);

    // Search users on submit
    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const search = await axios.get(`/api/user/search?search=${searchInput}`);
            const data = search.data;
            setLoading(false);
            if (data.success === false) {
                console.log(data.message);
            } else {
                if (data.length === 0) {
                    toast.info('User Not Found');
                } else {
                    setSearchUser(data);
                }
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    // Handle user click to select conversation
    const handleUserClick = (user) => {
        onSelectUser(user);
        setSelectedConversation(user);
        setSelectedUserId(user._id);
        setNewMessageUsers(null);
    };

    // Handle search back button
    const handleSearchBack = () => {
        setSearchUser([]);
        setSearchInput('');
    };

    // Handle logout
    const handleLogOut = async () => {
        const confirmlogout = window.prompt("type 'UserName' To LOGOUT");
        if (confirmlogout === authUser.username) {
            setLoading(true);
            try {
                const logout = await axios.post('/api/auth/logout');
                const data = logout.data;
                setLoading(false);
                if (data?.success === false) {
                    console.log(data?.message);
                }
                toast.info(data?.message);
                localStorage.removeItem('user');
                setAuthUser(null);
                navigate('/login');
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        } else {
            toast.info('LogOut Cancelled');
        }
    };

    return (
        <Box h="full" px={2}>
            <Flex justify="space-between" gap={2}>
                <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', width: 'auto' }}>
                    <Input
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        type="text"
                        variant="outline"
                        borderRadius="full"
                        placeholder="Search user"
                        size="md"
                        mr={2}
                    />
                    <Button
                        variant="solid"
                        colorScheme="teal"
                        size="md"
                        borderRadius="full"
                        type="submit"
                        isLoading={loading}
                    >
                        <FaSearch />
                    </Button>
                </form>
                <Avatar
                    name={authUser?.username}
                    src={authUser?.profilepic}
                    size="md"
                    cursor="pointer"
                    onClick={() => navigate(`/profile/${authUser?._id}`)}
                    _hover={{ transform: 'scale(1.1)' }}
                />
            </Flex>

            <Divider my={3} />

            {searchUser.length > 0 ? (
                <VStack spacing={2} overflowY="auto" h="70%">
                    {searchUser.map((user) => (
                        <Box
                            key={user._id}
                            p={2}
                            borderRadius="md"
                            display="flex"
                            alignItems="center"
                            cursor="pointer"
                            _hover={{ bg: 'teal.100' }}
                            onClick={() => handleUserClick(user)}
                            bg={selectedUserId === user._id ? 'teal.500' : 'transparent'}
                        >
                            <Avatar name={user.username} src={user.profilepic} mr={3} />
                            <Text fontWeight="bold">{user.username}</Text>
                            {isOnline[searchUser.indexOf(user)] && (
                                <Box ml="auto" bg="green.400" color="white" borderRadius="full" px={2} fontSize="xs">
                                    Online
                                </Box>
                            )}
                        </Box>
                    ))}
                </VStack>
            ) : (
                <VStack spacing={2} overflowY="auto" h="70%">
                    {chatUser.length === 0 ? (
                        <Text fontSize="xl" color="yellow.500">
                            Why are you alone! 🤔 Search a username to chat
                        </Text>
                    ) : (
                        chatUser.map((user) => (
                            <Box
                                key={user._id}
                                p={2}
                                borderRadius="md"
                                display="flex"
                                alignItems="center"
                                cursor="pointer"
                                _hover={{ bg: 'teal.100' }}
                                onClick={() => handleUserClick(user)}
                                bg={selectedUserId === user._id ? 'teal.500' : 'transparent'}
                            >
                                <Avatar name={user.username} src={user.profilepic} mr={3} />
                                <Text fontWeight="bold">{user.username}</Text>
                                {newMessageUsers?.receiverId === authUser._id &&
                                newMessageUsers?.senderId === user._id ? (
                                    <Box ml="auto" bg="green.700" color="white" borderRadius="full" px={2} fontSize="xs">
                                        +1
                                    </Box>
                                ) : null}
                            </Box>
                        ))
                    )}
                </VStack>
            )}

            <Flex mt="auto" p={2} justify="space-between" align="center">
                <IconButton
                    icon={<IoArrowBackSharp />}
                    onClick={handleSearchBack}
                    aria-label="Back"
                    colorScheme="gray"
                    borderRadius="full"
                />
                <Button
                    leftIcon={<BiLogOut />}
                    onClick={handleLogOut}
                    colorScheme="red"
                    variant="outline"
                    size="sm"
                    borderRadius="full"
                >
                    Logout
                </Button>
            </Flex>
        </Box>
    );
};

export default Sidebar;
