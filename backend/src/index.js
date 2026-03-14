// ================= BACKEND =================
// backend/src/index.js (FINAL FIX)

import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

// ROUTES
import userRoutes from "./routes/userRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminDashboardRoutes from "./routes/adminDashboardRoutes.js";
import adminUserRoutes from "./routes/adminUserRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import adminContactRoutes from "./routes/adminContactRoutes.js";

dotenv.config();
connectDB(); // MongoDB Atlas connection

const app = express();

/* ================= MIDDLEWARE ================= */

// ✅ Allow frontend from Vercel + Localhost
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://food-startup-mu.vercel.app",
      "https://food-startup-95c3jeqvf-princes-projects-d7be7534.vercel.app"
    ],
    credentials: true,
  })
);

app.use(express.json());

/* ================= STATIC FILES ================= */

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

/* ================= ROUTES ================= */

app.use("/api/users", userRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/orders", orderRoutes);

app.use("/api/admin", adminDashboardRoutes);
app.use("/api/admin/users", adminUserRoutes);
app.use("/api/admin/contacts", adminContactRoutes);

app.use("/api/contact", contactRoutes);

/* ================= SERVER ================= */

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
