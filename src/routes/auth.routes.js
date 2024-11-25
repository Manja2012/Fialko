import express from "express";
import {
  requestPasswordReset,
  resetPassword,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/request-password-reset", requestPasswordReset);

router.post("/reset-password", resetPassword);

export default router;
