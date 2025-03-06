import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";

// getProfile function to get user profile details
export const getProfile = async (req, res) => {
  try {
    // Retrieve the JWT token from cookies
    const token = req.cookies.jwt;
    
    // If there's no token or token is invalid, send a blank response
    if (!token) {
      return res.status(200).send({ success: true, user: {} }); // Blank response
    }

    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If token is invalid, send a blank response
    if (!decoded) {
      return res.status(200).send({ success: true, user: {} }); // Blank response
    }

    // Find the user by decoded ID
    const user = await User.findById(decoded.userId).select("-password");

    // If user doesn't exist, return a blank response
    if (!user) {
      return res.status(200).send({ success: true, user: {} }); // Blank response
    }

    // Send the user profile without the password
    return res.status(200).send({ success: true, user });

  } catch (error) {
    console.log('Error in getProfile function:', error.message);
    return res.status(500).send({ success: false, message: 'Internal server error' });
  }
};


export  const editProfile = async (req, res) => {
    try {
      // Retrieve the JWT token from cookies
      const token = req.cookies.jwt;
  
      // If there's no token or token is invalid, send a blank response
      if (!token) {
        return res.status(200).send({ success: true, user: {} }); // Blank response
      }
  
      // Decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      // If token is invalid, send a blank response
      if (!decoded) {
        return res.status(200).send({ success: true, user: {} }); // Blank response
      }
  
      // Find the user by decoded ID
      const user = await User.findById(decoded.userId);
  
      // If user doesn't exist, return a blank response
      if (!user) {
        return res.status(200).send({ success: true, user: {} }); // Blank response
      }
  
      // Proceed with updating user profile fields
      const { fullName, email, bio, profilePicture } = req.body;
  
      // Check if the email is being updated and is unique
      if (email && email !== user.email) {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).send({ success: false, message: 'Email already in use' });
        }
      }
  
      // Update user profile fields
      user.fullName = fullName || user.fullName;
      user.email = email || user.email;
      user.bio = bio || user.bio;
      user.profilePicture = profilePicture || user.profilePicture;
  
      // Save updated user profile to the database
      const updatedUser = await user.save();
  
      // Exclude password from the response
      const userProfile = { ...updatedUser.toObject(), password: undefined };
  
      return res.status(200).send({
        success: true,
        message: 'Profile updated successfully',
        user: userProfile,
      });
  
    } catch (error) {
      console.log('Error in editProfile function:', error.message);
      return res.status(500).send({ success: false, message: 'Internal server error' });
    }
  };


