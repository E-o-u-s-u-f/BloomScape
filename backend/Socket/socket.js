import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // The frontend's URL
    methods: ["GET", "POST"],
    credentials: true, // Allow cookies and authentication headers
  },
});

export const getReciverSocketId = (receiverId) => {
  return userSocketmap[receiverId];
};

const userSocketmap = {}; // Stores user ID and their associated socket ID

// When a new socket connects
io.on("connection", (socket) => {
  const userId = socket.handshake.auth.userId; // Get the userId from the handshake

  // Check if userId is passed and is valid
  if (userId && userId !== "undefined") {
    console.log(`User connected: ${userId} with socket ID: ${socket.id}`);
    userSocketmap[userId] = socket.id; // Store the socket ID for the user
  } else {
    console.log("User ID is undefined or invalid");
    socket.disconnect(); // Disconnect the socket if no valid userId is provided
    return; // Prevent further processing for invalid users
  }

  // Emit the list of online users (user IDs)
  io.emit("getOnlineUsers", Object.keys(userSocketmap));

  // When the socket disconnects, remove the user from the map and emit updated online users
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${userId}`);
    delete userSocketmap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketmap)); // Emit updated list of online users
  });
});

export { app, io, server };
