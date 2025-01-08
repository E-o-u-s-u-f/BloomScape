import express from "express";
import dotenv from "dotenv";
import { connect } from "mongoose";
import { connectDB } from "./config/db.js";

dotenv.config();

const app=express();

app.get("/products",(req,res)=> {
    res.send("server is ready");
})

console.log(process.env.MONGO_URI);

app.listen(5000,() =>{
    connectDB();
    console.log("server statred at http://localhost:5000");
});
//LClUvF0zLo7Ja2by  npm install mongodb