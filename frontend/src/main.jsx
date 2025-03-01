import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./Context/AuthContext.jsx"; // Import your AuthContextProvider
import App from "./App";
import { SocketContextProvider } from "./Context/SocketContext.jsx";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <AuthContextProvider>
          <SocketContextProvider>
          <App />
            </SocketContextProvider> {/* Wrapping the app with AuthContextProvider */}
        </AuthContextProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
