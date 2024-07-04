import { Request, Response } from "express";
import User from "../models/user";

export class UserService {
  async getAllUsers(req: Request, res: Response) {
    const users = await User.find();
    return res.status(200).json({ users });
  }
}
