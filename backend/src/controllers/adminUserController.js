// controllers/adminUserController.js
import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).sort({ createdAt: -1 });
  res.json(users);
};

export const updateUserStatus = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, {
    status: req.body.status,
  });
  res.json({ success: true });
};
