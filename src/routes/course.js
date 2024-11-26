import express from "express";
import { verifyAdminToken } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.js";
import {
  addCourse,
  getAllCourses,
  getByIdCourse,
  updateByIdCourse,
  deleteByIdCourse,
  getReview,
} from "../controllers/courses.controller.js";
import { validateCourse } from "../validators/courses.validator.js";
import { handleValidationErrors } from "../middlewares/validation.middleware.js";

const router = express.Router();

router.post(
  "/",
  upload,
  verifyAdminToken,
  validateCourse,
  handleValidationErrors,
  addCourse
);
router.get("/", getAllCourses);
router.get("/:id", getByIdCourse);
router.put(
  "/:id",
  verifyAdminToken,
  upload,
  validateCourse, 
  handleValidationErrors, 
  updateByIdCourse
);

router.delete("/:id", verifyAdminToken, deleteByIdCourse);
router.get("/:id/review", getReview);

export default router;
