import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import User from "./models/user.model.js";
import cors from "cors";
import jwttoken from "./utiles/jwtwebtoken.js";
import { v2 as cloudinary } from "cloudinary";
import multipleuploads from "./multipleuploads.js";
import massageroute from "./route&controller/messageRoute.js";
import cookieParser from "cookie-parser";
import userRoute from "./route&controller/userRoute.js";
import { app, server } from './Socket/socket.js';

dotenv.config();

// Define CORS options
const corsOptions = {
  origin: 'http://localhost:5173', // Allow only frontend to access the backend
  methods: ['GET', 'POST'],
  credentials: true, // Allow cookies or authentication tokens to be sent
};

//const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Use CORS with configuration
app.use(cors(corsOptions));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

app.use("/api/multiple", multipleuploads);
app.use("/api/massage", massageroute);
app.use("/api/user", userRoute);

app.post("/api/users", async (req, res) => {
  const user = req.body;

  if (!user.fullName || !user.email || !user.password) {
    return res.status(400).json({ success: false, message: "Please provide all fields" });
  }

  const newUser = new User(user);

  try {
    await newUser.save();
    jwttoken(newUser._id, res);
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    console.log("Error in creating user", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    // Directly compare the plain text password (not secure, for illustration only)
    if (user.password !== password) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwttoken(user._id, res);
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Listen for connections (for both HTTP and WebSocket)
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
});
