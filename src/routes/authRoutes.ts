import { Router } from "express";
import { AuthService } from "../services/authService";
import { AuthController } from "../controllers/authController";
import { ErrorResponseMiddleware } from "../middlewares/errorResponseMiddleware";
import { ErrorService } from "../services/errorService";
import { upload } from "../utils/uploadPhoto";
import { AuthValidator } from "../validators/authValidator";
import { AuthMiddleware } from "../middlewares/authMiddleware";

const authService = new AuthService();
const authController = new AuthController(authService);
const errorService = new ErrorService();
const errorResponseMiddleware = new ErrorResponseMiddleware(errorService);
const authMiddleware = new AuthMiddleware(authService);
const authValidator = new AuthValidator();

const router = Router();
router.post(
  "/register",
  authValidator.registerValidation(),
  errorResponseMiddleware.handleErrorResponse.bind(errorResponseMiddleware),
  authController.register.bind(authController)
);
router.post(
  "/login",
  authValidator.loginValidation(),
  errorResponseMiddleware.handleErrorResponse.bind(errorResponseMiddleware),
  authController.login.bind(authController)
);
router.post("/logout", authController.logout.bind(authController));
router.get("/refresh", authController.refreshToken.bind(authController));
router.post(
  "/:id/upload",
  upload.single("photo"),
  authValidator.photoValidation(),
  errorResponseMiddleware.handleErrorResponse.bind(errorResponseMiddleware),
  authController.upload.bind(authController)
);

export default router;
