import mongoose from "mongoose";

const schema = new mongoose.Schema({
    image: [{
        url: String,
        id: String,
    }],
    profileName: { 
        type: String, 
        required: true 
    },
    title: { 
        type: String, 
        required: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    likeAmount: { 
        type: Number, 
        default: 0  // Set a default value if you want to start with 0 likes
    },
    adminStatus: { 
        type: Boolean, 
        default: false 
    }
    
},{timestamps:true});

export const MultipleCloud = mongoose.model("MultipleCloud", schema);
