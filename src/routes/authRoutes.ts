import { Router } from "express";
import {
  registerValidation,
  loginValidation,
} from "../validators/authValidator";
import { AuthService } from "../services/authService";
import { AuthController } from "../controllers/authController";

const authService = new AuthService();
const authController = new AuthController(authService);

const router = Router();
router.post(
  "/register",
  registerValidation,
  authController.register.bind(authController)
);
router.post(
  "/login",
  loginValidation,
  authController.login.bind(authController)
);
router.post("/logout", authController.logout.bind(authController));
router.get("/refresh", authController.refreshToken.bind(authController));

export default router;
