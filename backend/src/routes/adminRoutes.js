import express from "express";
import verifyFirebaseToken from "../middleware/firebaseAuth.js";
import checkAdmin from "../middleware/roleCheck.js";

const router = express.Router();

router.get("/check", verifyFirebaseToken, checkAdmin, (req, res) => {
  res.json({ allowed: true });
});

export default router;
