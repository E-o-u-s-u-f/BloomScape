import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import User from "./models/user.model.js";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import multipleuploads from "./multipleuploads.js"
import nodemailer from "nodemailer";
dotenv.config();

const app=express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

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

app.use("/api/multiple",multipleuploads);

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
  
      // Verify user and clear OTP
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
        // Check if the user exists
        const user = await User.findOne({ email });
        console.log("User found:", user);
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        // Directly compare the plain text password (not secure, for illustration only)
        if (user.password !== password) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Send a simple response indicating the user has logged in successfully
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});
app.listen(5000,() =>{
    connectDB();
    console.log("server statred at http://localhost:5000");
});