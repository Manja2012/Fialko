import express from "express";
import {
  verifieToken,
  } from "../middlewares/auth.middleware.js";;
import createCheckOutSession from "../services/checkout.js";

const router = express.Router();

router.post("/create-checkout-session", verifieToken, createCheckOutSession);

export default router;
