import User from "../models/User.js";

export const loginUser = async (req, res) => {
  const { uid, email } = req.user;

  // 1️⃣ Check user in MongoDB
  let user = await User.findOne({ uid });

  // 2️⃣ If not exists → create
  if (!user) {
    user = await User.create({
      uid,
      email,
      role: "user", // default
    });
  }

  // 3️⃣ Send role to frontend
  res.json({
    success: true,
    role: user.role,
  });
};
