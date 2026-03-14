import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  createOrder,
  getAllOrders,
  getMyOrders,
  updateOrderStatus
} from "../controllers/orderController.js";

const router = express.Router();

/* USER */
router.post("/",protect,createOrder);
router.get("/my",protect,getMyOrders);

/* ADMIN */
router.get("/",protect,getAllOrders);
router.put("/:id/status",protect,updateOrderStatus);

export default router;
