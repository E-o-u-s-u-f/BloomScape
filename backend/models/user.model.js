import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String, 
        default: "https://example.com/default-profile.png"
    },
    bio: {
        type: String,
        default: "" 
    },
    role: {
        type: String,
        enum: ["user", "admin"], 
        default: "user" 
    }
}, {
    timestamps: true 
});

const User = mongoose.model('User', userSchema);

export default User;
