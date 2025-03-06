import User from "../models/user.model.js";
import jwttoken from "../utiles/jwtwebtoken.js";

export const getLoginUser=async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    // Directly compare the plain text password (not secure, for illustration only)
    if (user.password !== password) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwttoken(user._id, res);
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
