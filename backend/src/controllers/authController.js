import User from "../models/User.js";

export const loginUser = async (req, res) => {

  const { uid, email, name } = req.user;

  // check user
  let user = await User.findOne({ uid });

  // if not exist create
  if (!user) {

    user = await User.create({
      uid,
      name,
      email,
      role: "user"
    });

  }

  res.json({
    success: true,
    role: user.role
  });

};
