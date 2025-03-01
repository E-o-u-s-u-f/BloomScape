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

export default ProtectedRoute;
