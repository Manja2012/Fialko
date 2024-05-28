import express from "express";

import {
  login,
  register,
  getAllUsers,
  getByIdUser,
  updateByIdUser,
  deleteByIdUser
} from "../controllers/users.controller.js";

const router = express.Router();

router.post("/log-in", login);
router.post("/add", register);
router.get("/", getAllUsers);
router.get("/:id", getByIdUser);
router.put("/update/:id", updateByIdUser);
router.delete("/delete/:id", deleteByIdUser);


export default router;