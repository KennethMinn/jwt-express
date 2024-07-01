import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getAllUsers } from "../controllers/userController";

const router = Router();

router.get("/users", authMiddleware, getAllUsers);

export default router;
