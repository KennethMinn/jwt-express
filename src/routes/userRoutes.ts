import { Router } from "express";
import { UserService } from "../services/userService";
import { UserController } from "../controllers/userController";
import { AuthMiddleware } from "../middlewares/authMiddleware";
import { AuthService } from "../services/authService";

const userService = new UserService();
const authService = new AuthService();
const userController = new UserController(userService);
const authMiddleware = new AuthMiddleware(authService);

const router = Router();
router.get(
  "/users",
  authMiddleware.verifyJwtToken.bind(authMiddleware),
  userController.getAllUsers.bind(userController)
);

export default router;
