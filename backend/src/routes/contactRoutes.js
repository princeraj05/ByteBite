// ================= BACKEND =================
// ✅ routes/contactRoutes.js

import express from "express";
import {
  createContact,
  getMyContacts,
} from "../controllers/contactController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// send contact
router.post("/", protect, createContact);

// 🔥 get user contacts + admin reply
router.get("/my", protect, getMyContacts);

export default router;
