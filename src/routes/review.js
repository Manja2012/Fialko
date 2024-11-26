import express from "express";
import {
  verifieToken,
  verifyAdminToken,
} from "../middlewares/auth.middleware.js";;

import {
  addReview,
  getAllReviews,
  getByIdReview,
  updateByIdReview,
  deleteByIdReview,
  getAllReviewsByOneCourse,
} from "../controllers/reviews.controller.js";

const router = express.Router();

router.post("/add/:idcourse", verifieToken, addReview);
router.get("/course/:courseId", getAllReviewsByOneCourse);
router.get("/", getAllReviews);
router.get("/:id", getByIdReview);
router.put("/:id", verifyAdminToken, updateByIdReview);
router.delete("/:id", verifyAdminToken, deleteByIdReview);

export default router;
