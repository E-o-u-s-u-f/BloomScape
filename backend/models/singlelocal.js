import mongoose from "mongoose";

const schema = new mongoose.Schema({
    image:{
        type:String,
        required:true,
    },
});
export const Singellocal=mongoose.model("SingleLocal",schema);
