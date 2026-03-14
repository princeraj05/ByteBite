import express from "express";
import Order from "../models/Order.js";
import User from "../models/User.js";
import Food from "../models/Food.js";

const router = express.Router();

/* ================= ADMIN DASHBOARD STATS ================= */
router.get("/stats", async (req, res) => {
  try {
    const users = await User.countDocuments();
    const orders = await Order.countDocuments();
    const foods = await Food.countDocuments();

    const revenueAgg = await Order.aggregate([
      { $match: { status: "Delivered" } },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]);

    const revenue = revenueAgg[0]?.total || 0;

    res.json({
      users,
      orders,
      foods,
      revenue,
    });
  } catch (err) {
    console.error("Admin dashboard error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
