import express from "express";
import {
  verifieToken,
  verifyAdminToken,
} from "../middlewares/auth.middleware.js";
import {
  addReview,
  getAllReviews,
  getByIdReview,
  updateByIdReview,
  deleteByIdReview,
  getAllReviewsByOneCourse,
} from "../controllers/reviews.controller.js";
import { validateReview } from "../validators/reviews.validator.js"; 
import { handleValidationErrors } from "../middlewares/validation.middleware.js"; 

const router = express.Router();

router.post(
  "/add/:idcourse",
  verifieToken,
  validateReview,
  handleValidationErrors,
  addReview
);
router.get("/course/:courseId", getAllReviewsByOneCourse);
router.get("/", getAllReviews);
router.get("/:id", getByIdReview);
router.put("/:id", verifyAdminToken, updateByIdReview);
router.delete("/:id", verifyAdminToken, deleteByIdReview);

export default router;
