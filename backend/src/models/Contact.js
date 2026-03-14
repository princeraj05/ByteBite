// ================= BACKEND =================
// ✅ models/Contact.js (UPDATED – reply support)

import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    uid: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },

    // 🔥 ADMIN REPLY
    reply: { type: String },
    repliedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
