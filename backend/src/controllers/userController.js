import User from "../models/User.js";

/* REGISTER USER */

export const registerUser = async (req, res) => {
  try {
    const { uid, name, email } = req.body;

    let user = await User.findOne({ uid });

    if (!user) {
      user = await User.create({
        uid,
        name,
        email,
        role: "user",
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGIN USER */

export const loginUser = async (req, res) => {
  try {
    const { uid, email } = req.user;

    let user = await User.findOne({ uid });

    if (!user) {
      user = await User.create({
        uid,
        email,
        name: "User",
        role: "user",
      });
    }

    res.json({
      success: true,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* GET ME */

export const getMe = async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.user.uid });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};