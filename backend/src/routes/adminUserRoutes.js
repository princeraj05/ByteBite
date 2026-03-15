import express from "express";
import {
getAllUsers,
updateUserStatus
} from "../controllers/adminUserController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/",protect,getAllUsers);

router.put("/:id/status",protect,updateUserStatus);

export default router;