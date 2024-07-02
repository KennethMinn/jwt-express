import { Router } from "express";
import { register, login, logout } from "../controllers/authController";
import {
  registerValidation,
  loginValidation,
} from "../validators/authValidator";
import { handleRefreshToken } from "../controllers/refreshTokenController";

const router = Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.post("/logout", logout);
router.get("/refresh", handleRefreshToken);

export default router;
