const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const dotenv = require("dotenv");
dotenv.config();

const register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, role } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      role,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Please enter valid username or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Please enter valid username or password" });
    }
    const expiresIn = 60 * 60 * 24 * 3;
    const expirationDate = Math.floor(Date.now() / 1000) + expiresIn;
    const token = jwt.sign(
      {
        username: user.username,
        email: user.email,
        id: user._id,
        role: user.role,
        exp: expirationDate,
      },
      process.env.JWT_SECRET
    );
    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token,
      expiresIn,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Failed to login user" });
  }
};

module.exports = { register, login };
