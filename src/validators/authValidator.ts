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

  photoValidation() {
    return [
      body("photo").custom((_value, { req }) => {
        if (!req.file) {
          throw new Error("Please upload a photo");
        }
        if (!req.file.mimetype.startsWith("image")) {
          throw new Error("Photo must be image");
        }
        return true;
      }),
    ];
  }
}
