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
connectDB();

const app = express();

/* ================= MIDDLEWARE ================= */

// ✅ Allowed origins list
const allowedOrigins = [
  "http://localhost:5173",
  "https://byte-bite-pi.vercel.app", // 👈 YOUR MAIN FRONTEND URL (IMPORTANT)
];

// ✅ CORS FIX (best practice)
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps / postman)
      if (!origin) return callback(null, true);

      if (
        allowedOrigins.includes(origin) ||
        /https:\/\/.*\.vercel\.app$/.test(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Handle preflight requests
app.options("*", cors());

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

/* ================= TEST ROUTE ================= */
// 🔥 connection test ke liye
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

/* ================= ERROR HANDLER ================= */

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({
    success: false,
    message: err.message,
  });
});

/* ================= SERVER ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});