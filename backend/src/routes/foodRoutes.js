import express from "express";

import {
  getFoods,
  addFood,
  deleteFood
} from "../controllers/foodController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

/* GET ALL FOODS */
router.get("/", getFoods);

/* ADD FOOD */
router.post(
  "/",
  protect,
  adminOnly,
  upload.single("image"),
  addFood
);

/* DELETE FOOD */
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteFood
);

export default router;