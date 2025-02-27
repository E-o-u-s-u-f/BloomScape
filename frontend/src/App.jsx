import { Box } from "@chakra-ui/react";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Navbar from "./components/Navbar.jsx";
import { useColorModeValue } from "@chakra-ui/react";
import Login from "./pages/login.jsx";
import SignUp from "./pages/SignnUp.jsx";
import Chat from "./pages/Chatpage.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Resource from "./pages/Resouce.jsx"; // Correct the import name

import Event from "./pages/EventPage.jsx";
import Profile from "./components/ProfileCard.jsx";
import Post from "./pages/Post.jsx";
import ProfileCard from "./components/ProfileCard.jsx";
import Articles from "./pages/Articles.jsx";
import ArticleDetail from "./components/ArticleDetail.jsx";
import AdminPanel from "./components/AdminPanel.jsx";

function App() {
  const location = useLocation();

  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      {/* Conditionally render Navbar only if the current route is not "/login" */}
      {!["/login", "/signup"].includes(location.pathname) && <Navbar />}

      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/search/:keyword" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="resources" element={<Resource />} /> // Correct the route component

        <Route path="/event" element={<Event />} />       
       <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={<Post />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:id" element={<ArticleDetail />} />
      </Routes>
    </Box>
  );
}

export default App;
