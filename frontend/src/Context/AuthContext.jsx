import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// Custom hook for using AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// Function to decode JWT token safely
const decodeToken = (token) => {
  try {
    const base64Url = token.split(".")[1]; // Get payload part
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Convert Base64Url to Base64
    return JSON.parse(atob(base64)); // Decode and parse JSON
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userInfo = JSON.parse(localStorage.getItem("user")); // Retrieve user info from localStorage


    if (token) {
      const decodedToken = decodeToken(token);
      
      if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
        setAuthUser({ ...decodedToken, ...userInfo }); // Set user with additional info if token is valid

      } else {
        localStorage.removeItem("authToken");
        setAuthUser(null);
      }
    } else {
      setAuthUser(null);
    }

    setLoading(false); // Loading completed
  }, []);

  // Logout function
    const logout = (navigate) => {
        localStorage.removeItem("user"); // Ensure user info is removed on logout

    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setAuthUser(null);
    navigate("/login"); // Navigate to login page after logout

  };

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, logout, loading }}>
      {!loading && children} {/* Prevents rendering children until loading is complete */}
    </AuthContext.Provider>
  );
};
