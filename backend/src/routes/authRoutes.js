import express from "express";
import { loginUser } from "../controllers/authController.js";
import verifyFirebaseToken from "../middleware/firebaseAuth.js";

const router = express.Router();

router.post("/login", verifyFirebaseToken, loginUser);

export default router;
