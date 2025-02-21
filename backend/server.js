import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import User from "./models/user.model.js";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import singleUpload from "./singleUpload.js";
import multipleuploads from "./multipleuploads.js"
dotenv.config();

const app=express();

app.use(express.json());
app.use(cors());

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });

app.use("/api/single",singleUpload);
app.use("/api/multiple",multipleuploads);

app.post("/api/users", async(req,res) => {
    const user = req.body;//user will send this data

    if (!user.fullName || !user.email || !user.password) {
        return res.status(400).json({ success: false, message: "plese provide all fields" });
    }

    const newUser = new User(user)

    try {
        await newUser.save();
        res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        console.log("Error in creating user", error.message);
        res.status(500).json({ success: false, message: "server error" });
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