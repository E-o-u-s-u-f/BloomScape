import { Box } from "@chakra-ui/react";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Navbar from "./components/Navbar.jsx";
import { useColorModeValue } from "@chakra-ui/react";
import Login from "./pages/login.jsx";
import SignUp from "./pages/SignnUp.jsx";
import Chat from "./Chat/Chatpage.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Resource from "./pages/Resouce.jsx";
import { ToastContainer } from "react-toastify";
import Event from "./pages/EventPage.jsx";
import Profile from "./components/ProfileCard.jsx";
import Post from "./pages/Post.jsx";
import Articles from "./pages/Articles.jsx";
import ArticleDetail from "./components/ArticleDetail.jsx";
import AdminPanel from "./components/AdminPanel.jsx";
import OTPVerification from "./pages/otp.jsx";
import VerifyUser from "./utiles/VerifyUser.jsx"; 
import ProtectedRoute from "./utiles/ProtectedRoutes.jsx";

function App() {
  const location = useLocation();
  
  const routesWithoutNavbar = ["/login", "/signup", "/otp-verification"];
  const showNavbar = !routesWithoutNavbar.includes(location.pathname);

  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      {showNavbar && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/otp-verification" element={<OTPVerification />} />

        {/* Protected Routes wrapped inside VerifyUser */}
        <Route element={<VerifyUser />}>
          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
          <Route path="/aboutus" element={<ProtectedRoute><AboutUs /></ProtectedRoute>} />
          <Route path="/resources" element={<ProtectedRoute><Resource /></ProtectedRoute>} />
          <Route path="/event" element={<ProtectedRoute><Event /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/create" element={<ProtectedRoute><Post /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
          <Route path="/articles" element={<ProtectedRoute><Articles /></ProtectedRoute>} />
          <Route path="/articles/:id" element={<ProtectedRoute><ArticleDetail /></ProtectedRoute>} />
        </Route>
      </Routes>

      <ToastContainer />
    </Box>
  );
}

export default App;
