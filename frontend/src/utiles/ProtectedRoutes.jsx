import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/profile", { withCredentials: true });
    
        if (response.data.success && response.data.user) {
          console.log("User Data:", response.data.user);
          setUser(response.data.user);
        } else {
          console.warn("No user found");
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error.response ? error.response.data : error.message);
        alert("Error fetching user data. Please check your internet or API.");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    

    fetchUser();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!user) {
    console.warn("User not found, redirecting to login.");
    return <Navigate to="/login" />;
  }

  if (adminOnly && user.role !== "admin") {
    console.warn(`Access denied: User role is "${user.role}"`);
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;



/*
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext"; // Import the auth context

const ProtectedRoute = ({ children }) => {
  const { authUser } = useAuth(); // Access the authUser from context
  
  // If the user is not authenticated, redirect to the login page
  if (!authUser) {
    return <Navigate to="/login" />;
  }

  // If the user is authenticated, render the children (protected components)
  return children;
};

export default ProtectedRoute;*/
