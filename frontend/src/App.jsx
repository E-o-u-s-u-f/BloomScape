
import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Navbar from "./components/Navbar.jsx";
import Chat from "./pages/Chatpage.jsx";
import Profile from "./components/ProfileCard.jsx";

function App() {
  return (
    <Box minH={"100vh"}>
      <Navbar/>
      <Profile/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
      
    </Box>
  )
}

export default App;

