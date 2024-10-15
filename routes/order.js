import express from "express";
import { addOrder, validatePayment } from "../controllers/order.controller.js";
const router = express.Router();

router.post("", addOrder);

router.put("/payment-date", validatePayment);

export default router;
