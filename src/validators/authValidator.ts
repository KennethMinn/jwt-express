import { body } from "express-validator";

// Validation rules for registering a new user
export const registerValidation = [
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

// Validation rules for logging in
export const loginValidation = [
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const photoValidation = [
  body("photo").custom((value, { req }) => {
    if (!value) {
      throw new Error("Please upload a photo");
    }
    if (!value.mimetype.startsWith("image")) {
      throw new Error("Photo must be image");
    }
    return true;
  }),
];
