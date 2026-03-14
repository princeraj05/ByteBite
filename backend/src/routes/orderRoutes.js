import express from "express";
import firebaseAuth from "../middleware/firebaseAuth.js";
import {
  createOrder,
  getAllOrders,
  getMyOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

/* USER */
router.post("/", firebaseAuth, createOrder);
router.get("/my", firebaseAuth, getMyOrders);

/* ADMIN */
router.get("/", firebaseAuth, getAllOrders);
router.put("/:id/status", firebaseAuth, updateOrderStatus);

export default router;
