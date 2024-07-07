import { body } from "express-validator";

export class AuthValidator {
  registerValidation() {
    return [
      body("email").isEmail().withMessage("Please enter a valid email"),
      body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    ];
  }

  loginValidation() {
    return [
      body("email").isEmail().withMessage("Please enter a valid email"),
      body("password").notEmpty().withMessage("Password is required"),
    ];
  }
}
