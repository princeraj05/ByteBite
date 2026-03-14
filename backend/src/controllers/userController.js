import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* ================= REGISTER ================= */

export const registerUser = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exist = await User.findOne({ email });

    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hash,
      role: "user"   // default role
    });

    res.status(201).json({
      message: "Registration successful"
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Registration failed"
    });

  }
};


/* ================= LOGIN ================= */

export const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      "SECRET123",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      role: user.role
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Login failed"
    });

  }

};


/* ================= GET USER ROLE ================= */

export const getMe = async (req, res) => {

  try {

    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token" });
    }

    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, "SECRET123");

    const user = await User.findById(decoded.id).select("-password");

    res.json({
      role: user.role
    });

  } catch (err) {

    res.status(401).json({
      message: "Invalid token"
    });

  }

};