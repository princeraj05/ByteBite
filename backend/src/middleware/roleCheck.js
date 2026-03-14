import User from "../models/User.js";

const roleCheck = (role) => {
  return async (req, res, next) => {
    try {
      const uid = req.user.uid;

      const user = await User.findOne({ uid });

      if (!user) {
        return res.status(403).json({ message: "User not found in DB" });
      }

      if (user.role !== role) {
        return res.status(403).json({ message: "Not admin" });
      }

      next();
    } catch (err) {
      console.error("Role check error:", err);
      return res.status(500).json({ message: "Role check failed" });
    }
  };
};

export default roleCheck;
