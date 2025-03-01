// AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        // Decode the JWT token
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decoding the JWT token payload
        if (decodedToken.exp * 1000 < Date.now()) {
          // If token is expired, clear from localStorage
          localStorage.removeItem("authToken");
          setAuthUser(null); // Set user to null (logged out)
        } else {
          // If token is valid, set the authUser state
          setAuthUser(decodedToken);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("authToken");
        setAuthUser(null); // Set user to null in case of error
      }
    } else {
      setAuthUser(null); // No token found, user is not logged in
    }
  }, []);

  // Logout function
  const logout = () => {
    localStorage.removeItem("authToken");
    setAuthUser(null); // Remove the authUser when logging out
  };

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
