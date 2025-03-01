import React, { useEffect } from "react";
import { useAuth } from "../Context/AuthContext"; // Assuming path to AuthContext is correct
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const VerifyUser = () => {
  const { authUser, setAuthUser } = useAuth(); // Access the authUser and setAuthUser from AuthContext
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const tokenParts = token.split(".");
        if (tokenParts.length === 3) {
          const decodedToken = JSON.parse(atob(tokenParts[1])); // Decode JWT payload

          if (decodedToken.exp * 1000 < Date.now()) {
            // Token expired
            localStorage.removeItem("authToken");
            setAuthUser(null);
            navigate("/login");
          } else {
            // Valid token
            setAuthUser(decodedToken);
          }
        } else {
          // Invalid token format
          localStorage.removeItem("authToken");
          setAuthUser(null);
          navigate("/login");
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("authToken");
        setAuthUser(null);
        navigate("/login");
      }
    } else {
      setAuthUser(null);
      navigate("/login");
    }
  }, [navigate, setAuthUser]);

  // Render child routes (outlet) if user is authenticated
  return authUser ? <Outlet /> : <div>Loading...</div>;
};

export default VerifyUser;
