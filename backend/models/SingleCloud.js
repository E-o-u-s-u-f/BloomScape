import mongoose from "mongoose";

const schema = new mongoose.Schema({
    image:{
        url:String,
        id:String,
    },
});
export const SingleCloud=mongoose.model("SingleCloud",schema);
