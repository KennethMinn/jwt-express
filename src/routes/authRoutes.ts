import { Router } from "express";
import {
  registerValidation,
  loginValidation,
  photoValidation,
} from "../validators/authValidator";
import { AuthService } from "../services/authService";
import { AuthController } from "../controllers/authController";
import { ErrorResponseMiddleware } from "../middlewares/errorResponseMiddleware";
import { ErrorService } from "../services/errorService";
import { upload } from "../utils/uploadPhoto";

const authService = new AuthService();
const authController = new AuthController(authService);
const errorService = new ErrorService();
const errorResponseMiddleware = new ErrorResponseMiddleware(errorService);

const router = Router();
router.post(
  "/register",
  registerValidation,
  errorResponseMiddleware.handleErrorResponse.bind(errorResponseMiddleware),
  authController.register.bind(authController)
);
router.post(
  "/login",
  loginValidation,
  errorResponseMiddleware.handleErrorResponse.bind(errorResponseMiddleware),
  authController.login.bind(authController)
);
router.post("/logout", authController.logout.bind(authController));
router.get("/refresh", authController.refreshToken.bind(authController));
router.post(
  "/upload",
  upload.single("photo"),
  photoValidation,
  errorResponseMiddleware.handleErrorResponse.bind(errorResponseMiddleware),
  authController.upload.bind(authController)
);

export default router;
