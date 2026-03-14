import express from "express";
import { getFoods, addFood, deleteFood } from "../controllers/foodController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/", getFoods);

router.post(
  "/",
  protect,
  adminOnly,
  upload.single("image"),
  addFood
);

router.delete("/:id", protect, adminOnly, deleteFood);

export default router;
