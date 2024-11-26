import express from "express";

import createCheckOutSession from "../services/checkout.js";

const router = express.Router();

router.post("/create-checkout-session", createCheckOutSession);

export default router;
