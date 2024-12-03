import express from "express";
import rateLimit from "express-rate-limit";
import {
  verifieToken,
  verifyAdminToken,
} from "../middlewares/auth.middleware.js";
import {
  login,
  register,
  getAllUsers,
  getByIdUser,
  updateByIdUser,
  deleteByIdUser,
  getCurrenctUser,
} from "../controllers/users.controller.js";
import {
  validateUserRegistration,
  validateUserLogin,
} from "../validators/users.validator.js";
import { handleValidationErrors } from "../middlewares/validation.middleware.js";

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    status: 429,
    error: "Too many attempts, please try again later.",
  },
  headers: true,
});

router.post(
  "/add",
  authLimiter,
  validateUserRegistration,
  handleValidationErrors,
  register
);

router.post(
  "/log-in",
  authLimiter,
  validateUserLogin,
  handleValidationErrors,
  login
);

router.get("/", getAllUsers);
router.get("/:id", getByIdUser);
router.put("/update/:id", verifyAdminToken, updateByIdUser);
router.delete("/delete/:id", verifyAdminToken, deleteByIdUser);

router.get("/current/get", verifieToken, getCurrenctUser);

export default router;
