import express from "express";

import {
  login,
  register,
  getAllUsers,
  getByIdUser,
  updateByIdUser,
  deleteByIdUser,
  getCurrenctUser,
} from "../controllers/users.controller.js";
import { verifieToken } from "../middlewares/auth.middleware.js";;

const router = express.Router();

router.post("/log-in", login);
router.post("/add", register);
router.get("/", getAllUsers);
router.get("/:id", getByIdUser);
router.put("/update/:id", updateByIdUser);
router.delete("/delete/:id", deleteByIdUser);
router.get("/current/get", verifieToken, getCurrenctUser);

export default router;
