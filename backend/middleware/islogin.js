import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";

const islogin = async (req, res, next) => {
  try {
    // Retrieve the JWT token from cookies
    const token = req.cookies.jwt;
    console.log('JWT Token:', token); // Debugging log

    // If there's no token, return an unauthorized response
    if (!token) {
      return res.status(401).send({ success: false, message: 'Empty token' });
    }

    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).send({ success: false, message: 'Invalid token' });
    }

    // Find the user by decoded ID
    const user = await User.findById(decoded.userId).select("-password"); // Await the result
    console.log('User:------>>>>', user); // Debugging log
    if (!user) {
      return res.status(404).send({ success: false, message: 'User not found' });
    }

    // Attach user to the request object
    req.user = user;
    next();

  } catch (error) {
    console.log('Error in islogin middleware:', error.message); // Debugging log
    return res.status(500).send({ success: false, message: 'Internal server error' });
  }
};

export default islogin;
