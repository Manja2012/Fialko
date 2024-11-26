import { body } from "express-validator";

export const validateReview = [
  body("comment")
    .notEmpty()
    .withMessage("Comment is required")
    .isLength({ max: 1000 })
    .withMessage("Comment must not exceed 1000 characters"),

  body("rating")
    .notEmpty()
    .withMessage("Rating is required")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be an integer between 1 and 5"),

  body("course")
    .notEmpty()
    .withMessage("Course is required")
    .isMongoId()
    .withMessage("Invalid course ID"),

  body("user")
    .notEmpty()
    .withMessage("User is required")
    .isMongoId()
    .withMessage("Invalid user ID"),
];
