import express from "express";
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

router.post("/add", validateUserRegistration, handleValidationErrors, register);

router.post("/log-in", validateUserLogin, handleValidationErrors, login);

router.get("/", getAllUsers);
router.get("/:id", getByIdUser);
router.put("/update/:id", verifyAdminToken, updateByIdUser);
router.delete("/delete/:id", verifyAdminToken, deleteByIdUser);

router.get("/current/get", verifieToken, getCurrenctUser);

export default router;
