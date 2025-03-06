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
const Sidebar = ({ onSelectUser }) => {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useAuth();
  const [searchInput, setSearchInput] = useState('');
  const [searchUser, setSearchuser] = useState([]);
  const [chatUser, setChatUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUserId, setSetSelectedUserId] = useState(null);
  const [newMessageUsers, setNewMessageUsers] = useState('');
  const { messages, setMessage, selectedConversation, setSelectedConversation } = userConversation();
  const { onlineUser, socket } = useSocketContext();

  const nowOnline = chatUser.map((user) => user._id);
  const isOnline = nowOnline.map((userId) => onlineUser.includes(userId));

  useEffect(() => {
    socket?.on('newMessage', (newMessage) => {
      setNewMessageUsers(newMessage);
    });
    return () => socket?.off('newMessage');
  }, [socket, messages]);

  useEffect(() => {
    const chatUserHandler = async () => {
      setLoading(true);
      try {
        const chatters = await axios.get('/api/user/currentchatters');
        const data = chatters.data;
        if (data.success === false) {
          setLoading(false);
          console.log(data.message);
        }
        setLoading(false);
        setChatUser(data);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    chatUserHandler();
  }, []);

  const handelSearchSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const search = await axios.get(`/api/user/search?search=${searchInput}`);
      const data = search.data;
      if (data.success === false) {
        setLoading(false);
        console.log(data.message);
      }
      setLoading(false);
      if (data.length === 0) {
        toast.info('User Not Found');
      } else {
        setSearchuser(data);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handelUserClick = (user) => {
    onSelectUser(user);
    setSelectedConversation(user);
    setSetSelectedUserId(user._id);
    setNewMessageUsers('');
  };

  const handSearchback = () => {
    setSearchuser([]);
    setSearchInput('');
  };

const handelLogOut = async () => {
    if (!authUser) {
        toast.error("User is not logged in.");
        return;
    }


    const confirmlogout = window.prompt("type 'UserName' To LOGOUT");
    console.log("AuthUser:", authUser);

    if (confirmlogout === authUser.fullName ) {
        setLoading(true)
        try {
            const logout = await axios.post('/api/logout')
            const data = logout.data;
            if (data?.success === false) {
                setLoading(false)
                console.log(data?.message);
            }
            toast.info(data?.message)
            //localStorage.removeItem('authToken')
            localStorage.removeItem('user')
            setAuthUser(null)
            setLoading(false)
            navigate('.api/login')
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    } else {
        toast.info("LogOut Cancelled")
    }

}


  return (
    <div style={{ height: '100%', padding: '0 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
        <form onSubmit={handelSearchSubmit} style={{ display: 'flex', justifyContent: 'space-between', width: 'auto', backgroundColor: 'white', borderRadius: '50px' }}>
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type='text'
            style={{ padding: '0.5rem', width: 'auto', backgroundColor: 'transparent', border: 'none', outline: 'none', borderRadius: '50px' }}
            placeholder='search user'
          />
          <button type='submit' style={{ background: '#38bdf8', borderRadius: '50%', padding: '0.5rem' }}>
            <FaSearch style={{ color: 'white' }} />
          </button>
        </form>
        <img
          onClick={() => navigate(`/profile/${authUser?._id}`)}
          src={authUser?.profilepic}
          style={{ height: '48px', width: '48px', borderRadius: '50%', cursor: 'pointer', transition: 'transform 0.3s' }}
          onMouseOver={(e) => (e.target.style.transform = 'scale(1.1)')}
          onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
        />
      </div>
      <hr style={{ margin: '1rem 0' }} />
      {searchUser?.length > 0 ? (
        <>
          <div style={{ minHeight: '70%', maxHeight: '80%', overflowY: 'auto' }}>
            <div style={{ width: 'auto' }}>
              {searchUser.map((user, index) => (
                <div key={user._id}>
                  <div
                    onClick={() => handelUserClick(user)}
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      alignItems: 'center',
                      padding: '0.5rem',
                      cursor: 'pointer',
                      backgroundColor: selectedUserId === user?._id ? '#38bdf8' : 'transparent',
                      borderRadius: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%' }}>
                        <img src={user.profilepic} alt='user.img' style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
                      <p style={{ fontWeight: 'bold', color: '#333' }}>{user.username}</p>
                    </div>
                  </div>
                  <hr style={{ margin: '0.5rem 0', border: '1px solid #ddd' }} />
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: 'auto' }}>
            <button onClick={handSearchback} style={{ background: 'white', borderRadius: '50%', padding: '0.5rem' }}>
              <IoArrowBackSharp size={25} />
            </button>
          </div>
        </>
      ) : (
        <>
          <div style={{ minHeight: '70%', maxHeight: '80%', overflowY: 'auto' }}>
            <div style={{ width: 'auto' }}>
              {chatUser.length === 0 ? (
                <div style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '1.5rem', color: '#f39c12' }}>
                  <h1>Why are you Alone!!🤔</h1>
                  <h1>Search username to chat</h1>
                </div>
              ) : (
                chatUser.map((user, index) => (
                  <div key={user._id}>
                    <div
                      onClick={() => handelUserClick(user)}
                      style={{
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center',
                        padding: '0.5rem',
                        cursor: 'pointer',
                        backgroundColor: selectedUserId === user?._id ? '#38bdf8' : 'transparent',
                        borderRadius: '8px',
                      }}
                    >
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%' }}>
                        <img src={user.profilepic} alt='user.img' style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
                        <p style={{ fontWeight: 'bold', color: '#333' }}>{user.username}</p>
                      </div>
                      {newMessageUsers.receiverId === authUser._id && newMessageUsers.senderId === user._id && (
                        <div
                          style={{
                            backgroundColor: '#4caf50',
                            color: 'white',
                            padding: '2px 8px',
                            borderRadius: '50%',
                            fontSize: '0.875rem',
                          }}
                        >
                          +1
                        </div>
                      )}
                    </div>
                    <hr style={{ margin: '0.5rem 0', border: '1px solid #ddd' }} />
                  </div>
                ))
              )}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: 'auto' }}>
            <button onClick={handelLogOut} style={{ background: '#f44336', borderRadius: '8px', padding: '0.5rem' }}>
              <BiLogOut size={25} style={{ color: 'white' }} />
            </button>
            <p style={{ fontSize: '0.875rem', padding: '0.5rem' }}>Logout</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
