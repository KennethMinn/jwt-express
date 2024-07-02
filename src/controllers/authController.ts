import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import User from "../models/user";

// Controller for user registration
export const register = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({ email, password });
    await user.save();

    return res.status(201).json({ message: "User created successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Controller for user login
export const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN_SECRET!,
      {
        expiresIn: "20s",
      }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.REFRESH_TOKEN_SECRET!,
      {
        expiresIn: "1h",
      }
    );

    // Save the refresh token in the database
    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ accessToken, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  const cookies = req.cookies;

  if (!cookies?.refresh_token)
    return res.status(401).json({ message: "Unauthenticated" });

  const refreshToken = cookies.refresh_token;

  const foundUser = await User.findOne({ refreshToken });
  if (!foundUser) {
    res.clearCookie("refresh_token", { httpOnly: true });
    return res.status(204).json({ message: "Logout successfully" });
  }

  foundUser.refreshToken = "";
  await foundUser.save();

  res.clearCookie("refresh_token", { httpOnly: true });
  return res.status(204).json({ message: "Logout successfully" });
};
