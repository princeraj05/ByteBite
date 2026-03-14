// ================= BACKEND =================
// ✅ routes/adminContactRoutes.js

import express from "express";
import {
  getAllContacts,
  replyToContact,
} from "../controllers/adminContactController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// get all user contacts
router.get("/", protect, adminOnly, getAllContacts);

// reply to a contact
router.post("/:id/reply", protect, adminOnly, replyToContact);

export default router;
