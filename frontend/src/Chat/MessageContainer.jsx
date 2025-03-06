import React, { useEffect, useState, useRef } from 'react';
import userConversation from '../Zustand/userConversation.js';
import { useAuth } from '../Context/AuthContext.jsx';
import { TiMessages } from 'react-icons/ti';
import { IoArrowBackSharp, IoSend } from 'react-icons/io5';
import axios from 'axios';
import { useSocketContext } from '../Context/SocketContext.jsx';
import notify from '../assets/notification.mp3';
import { Box, Flex, Text, Button, Input, Avatar, Spinner } from '@chakra-ui/react';

const MessageContainer = ({ onBackUser }) => {
  const { messages = [], selectedConversation, setMessage, setSelectedConversation } = userConversation();
  const { socket } = useSocketContext();
  const { authUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendData, setSendData] = useState('');
  const lastMessageRef = useRef();

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      console.log('New message received:', newMessage); // Debugging log
      const sound = new Audio(notify);
      sound.play();
      setMessage((prevMessages) => [...prevMessages, newMessage]);
    };
  
    socket?.on('newMessage', handleNewMessage);
  
    return () => {
      socket?.off('newMessage', handleNewMessage);
    };
  }, [socket, setMessage]);

  useEffect(() => {
    if (selectedConversation?._id) {
      const getMessages = async () => {
        setLoading(true);
        try {
          const get = await axios.get(`/api/massage/${selectedConversation?._id}`);
          const data = await get.data;
          setLoading(false);
          if (data.success === false) {
            console.log(data.message);
          }
          setMessage(Array.isArray(data) ? data : []);
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      };
      getMessages();
    }
  }, [selectedConversation?._id, setMessage]);

  useEffect(() => {
    lastMessageRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleMessages = (e) => {
    setSendData(e.target.value);
  };

  const handleSubmit = async (e) => {
   // e.preventDefault();
    
    setSending(true);
    try {console.log('Form submitted');
      const sound = new Audio(notify);
      sound.play();
      const response = await axios.post(`/api/massage/send/${selectedConversation._id}`, {
        massage: sendData,
      });
      console.log(response);
      const data = await response.data;
      console.log(data);
      if (data.success === false) {
        console.log(data.massage);
      } else {
        console.log('sent massage');

        setMessage((prevMessages) => [...prevMessages, data.massage]);
        setSendData('');

      }
    } catch (error) {
      console.log(error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ minWidth: '500px', height: '99%', display: 'flex', flexDirection: 'column', padding: '16px' }}>
      {selectedConversation === null ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '0 16px', textAlign: 'center' }}>
            <p style={{ fontSize: '2rem', color: '#333', fontWeight: '600' }}>Welcome!!👋 {authUser.username}😉</p>
            <p style={{ fontSize: '1rem' }}>Select a chat to start messaging</p>
            <TiMessages style={{ fontSize: '6rem' }} />
          </div>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '4px', backgroundColor: '#38bdf8', padding: '0 8px', borderRadius: '8px', height: '48px' }}>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <div style={{ display: 'none', marginLeft: '4px' }}>
                <button onClick={() => onBackUser(true)} style={{ backgroundColor: 'white', borderRadius: '50%', padding: '8px' }}>
                  <IoArrowBackSharp size={25} />
                </button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginRight: '8px', gap: '8px' }}>
                <img src={selectedConversation?.profilepic} alt="user" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                <p style={{ color: '#333', fontSize: '1rem', fontWeight: 'bold' }}>{selectedConversation?.username}</p>
              </div>
            </div>
          </div>

          <div style={{ flex: '1', overflowY: 'auto', marginTop: '16px' }}>
            {loading ? (
              <Spinner size="xl" />
            ) : messages?.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'white' }}>Send a message to start Conversation</p>
            ) : (
              messages.map((message) => (
                <div key={message?._id} ref={lastMessageRef}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div
                      className={`chat ${message.senderId === authUser._id ? 'chat-end' : 'chat-start'}`}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: '8px',
                      }}
                    >
                      <div className="chat-image avatar"></div>
                      <div
                        style={{
                          backgroundColor: message.senderId === authUser._id ? 'skyblue' : 'transparent',
                          padding: '8px',
                          borderRadius: '8px',
                          color: 'blue',
                          maxWidth: '80%',
                        }}
                      >
                        {message?.massage}
                      </div>
                    </div>
                    <div style={{ fontSize: '10px', opacity: '0.8' }}>
                      {new Date(message?.createdAt).toLocaleDateString('en-IN')}
                      {new Date(message?.createdAt).toLocaleTimeString('en-IN', {
                        hour: 'numeric',
                        minute: 'numeric',
                      })}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', padding: '8px', borderRadius: '50px', marginTop: '16px' }}>
              <input
                value={sendData}
                onChange={handleMessages}
                required
                placeholder="Type a message"
                id="message"
                type="text"
                style={{
                  width: '100%',
                  backgroundColor: 'transparent',
                  padding: '8px',
                  border: 'none',
                  outline: 'none',
                  borderRadius: '50px',
                }}
              />
              <button type="submit" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                {sending ? (
                  <div style={{ border: '4px solid #f3f3f3', borderTop: '4px solid #3498db', borderRadius: '50%', width: '20px', height: '20px', animation: 'spin 2s linear infinite' }}></div>
                ) : (
                  <IoSend size={25} style={{ color: '#38bdf8' }} />
                )}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default MessageContainer;