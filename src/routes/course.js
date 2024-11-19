import express from "express";
import { verifieToken, verifyAdminToken } from "../auth/auth.controller.js";

import {
  addCourse,
  getAllCourses,
  getByIdCourse,
  updateByIdCourse,
  deleteByIdCourse,
  getReview,
} from "../controllers/courses.controller.js";
import upload from "../middlewares/upload.js";
const router = express.Router();

router.post("/", upload, addCourse);
router.get("/", getAllCourses);
router.get("/:id", getByIdCourse);
router.put("/:id", verifyAdminToken, upload, updateByIdCourse);
router.delete("/:id", verifyAdminToken, deleteByIdCourse);
router.get("/:id/review", getReview);

export default router;
