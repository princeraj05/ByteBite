// ================= BACKEND =================
// ✅ controllers/adminContactController.js

import Contact from "../models/Contact.js";

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch contacts" });
  }
};

export const replyToContact = async (req, res) => {
  try {
    const { reply } = req.body;

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    contact.reply = reply;
    contact.repliedAt = new Date();
    await contact.save();

    res.json({ success: true, message: "Reply saved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send reply" });
  }
};
