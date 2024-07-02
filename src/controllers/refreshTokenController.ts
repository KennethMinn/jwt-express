import { NextFunction, Request, Response } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { cookie, validationResult } from "express-validator";
import User from "../models/user";

// Controller for user login
export const handleRefreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies;

  if (!cookies?.refresh_token)
    return res.status(401).json({ message: "Unauthenticated" });

  console.log(cookies.refresh_token);
  const refreshToken = cookies.refresh_token;

  const foundUser = await User.findOne({ refreshToken });
  if (!foundUser) return res.status(403).json({ message: "Forbidden" });

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (err: any) => {
    if (err) return res.status(401).json({ message: "Unauthenticated" }); //invalid token
    const accessToken = jwt.sign(
      { userId: foundUser.id },
      process.env.ACCESS_TOKEN_SECRET!,
      {
        expiresIn: "20s",
      }
    );

    return res.status(200).json({ accessToken });
  });
};
