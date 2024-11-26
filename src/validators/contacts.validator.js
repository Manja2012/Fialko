import { body } from "express-validator";

export const validateContact = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 100 })
    .withMessage("Name must not exceed 100 characters"),

  body("email").isEmail().withMessage("Invalid email format").normalizeEmail(),

  body("phone")
    .notEmpty()
    .withMessage("Phone is required")
    .isLength({ min: 10 })
    .withMessage("Phone number must be at least 10 digits"),

  body("message")
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ max: 500 })
    .withMessage("Message must not exceed 500 characters"),
];
