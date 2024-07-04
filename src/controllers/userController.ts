import { Request, Response } from "express";
import User from "../models/user";
import { UserService } from "../services/userService";

export class UserController {
  constructor(private userService: UserService) {}

  getAllUsers(req: Request, res: Response) {
    return this.userService.getAllUsers(req, res);
  }
}
