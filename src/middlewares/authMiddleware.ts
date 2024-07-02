import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Middleware to verify JWT token
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.headers.authorization?.replace("Bearer", "").trim();

  if (!accessToken) {
    //throw new Error("Unauthenticated");
    return res.status(401).json({ message: "Unauthenticated" }); //invalid token
  }

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!, (err) => {
    if (err) {
      return res.status(401).json({ message: "Unauthenticated" }); //invalid token
    } else {
      next();
    }
  });
};
