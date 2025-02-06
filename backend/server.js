import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import User from "./models/user.model.js";
import cors from "cors";
dotenv.config();

const app=express();

app.use(express.json());
app.use(cors());

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

app.listen(5000,() =>{
    connectDB();
    console.log("server statred at http://localhost:5000");
});