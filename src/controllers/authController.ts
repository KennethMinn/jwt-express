import { Request, Response } from "express";
import { AuthService } from "../services/authService";

export class AuthController {
  constructor(private authService: AuthService) {}

  register(req: Request, res: Response) {
    return this.authService.registerUser(req, res);
  }

  login(req: Request, res: Response) {
    return this.authService.loginUser(req, res);
  }

  logout(req: Request, res: Response) {
    return this.authService.logoutUser(req, res);
  }

  refreshToken(req: Request, res: Response) {
    return this.authService.handleRefreshToken(req, res);
  }

  upload(req: Request, res: Response) {
    try {
      console.log(req.file); //file obj, undefined
      return res.json({ image: "uploaded" });
    } catch (e) {
      return res.status(500).json({ msg: "internet server error" });
    }
  }
}
