import User from "../models/User.js";

export const adminOnly = async (req, res, next) => {
  const user = await User.findOne({ uid: req.user.uid });

  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }

  next();
};
