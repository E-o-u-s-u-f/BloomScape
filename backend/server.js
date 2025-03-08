import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import User from "./models/user.model.js";
import cors from "cors";
import jwttoken from "./utiles/jwtwebtoken.js";
import { v2 as cloudinary } from "cloudinary";
import multipleuploads from "./multipleuploads.js";
import nodemailer from "nodemailer";
import massageroute from "./route&controller/messageRoute.js";
import cookieParser from "cookie-parser";
import userRoute from "./route&controller/userRoute.js";
import { app, server } from "./Socket/socket.js";
import islogin from "./middleware/islogin.js";
import profile from "./Profile/profileroute.js";
import commentRoute from "./route&controller/commentRoute.js";
import multer from "multer";
import jwt from "jsonwebtoken";

dotenv.config();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Multer configuration for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SENDER,
    pass: process.env.PASSWORD,
  },
});

const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

app.use("/api/multiple", multipleuploads);
app.use("/api/massage", massageroute);
app.use("/api/user", userRoute);
app.use("/api", profile);
app.use("/api/posts", commentRoute);

// Profile Picture Upload API
app.post("/api/profile/upload", islogin, upload.single("profilePicture"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "profile_pictures",
          resource_type: "image",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(req.file.buffer);
    });

    user.profilePicture = result.secure_url;
    await user.save();

    res.json({
      success: true,
      imageUrl: result.secure_url,
      user: {
        fullName: user.fullName,
        email: user.email,
        bio: user.bio,
        profilePicture: user.profilePicture,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Profile upload error:", error);
    res.status(500).json({ success: false, message: "Server error during upload" });
  }
});

// Profile Update API (New Endpoint)
app.put("/api/profile", islogin, async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const { fullName, email, bio, profilePicture } = req.body;

    // Update only provided fields
    if (fullName) user.fullName = fullName;
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: "Email already in use" });
      }
      user.email = email;
    }
    if (bio) user.bio = bio;
    if (profilePicture) user.profilePicture = profilePicture;

    await user.save();

    res.json({
      success: true,
      user: {
        fullName: user.fullName,
        email: user.email,
        bio: user.bio,
        profilePicture: user.profilePicture,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ success: false, message: "Server error during profile update" });
  }
});

// Existing routes...
app.post("/api/users", async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const otp = generateOTP();

    const user = new User({
      fullName,
      email,
      password,
      otp,
      otpExpires: Date.now() + 10 * 60 * 1000,
    });
    await user.save();

    const mailOptions = {
      from: process.env.SENDER,
      to: email,
      subject: "Your OTP for Verification",
      text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "OTP sent to your email", email });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Error in signup process" });
  }
});

app.post("/api/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    if (user.otp !== otp || Date.now() > user.otpExpires) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(201).json({ message: "User verified successfully" });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

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

app.post("/api/logout", async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(200).send({ success: true, message: "User LogOut" });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error,
    });
    console.log(error);
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
});