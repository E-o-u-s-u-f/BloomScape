import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure email is unique
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String, // URL of profile picture
        default: "https://example.com/default-profile.png" // Default image
    },
    bio: {
        type: String,
        default: "" // Optional bio, can be updated later
    },
    role: {
        type: String,
        enum: ["user", "admin"], // Possible roles
        default: "user" // Defaults to "user", but can be changed later
    }
}, {
    timestamps: true // Automatically adds createdAt & updatedAt
});

const User = mongoose.model('User', userSchema);

export default User;
