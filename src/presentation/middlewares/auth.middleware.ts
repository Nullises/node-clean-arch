import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data";

export class AuthMiddleware {
  static validateJWT = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const authorization = req.header("Authorization");

    if (!authorization)
      return res.status(401).json({ error: "No Token provided" });

    if (!authorization.startsWith("Bearer "))
      return res.status(401).json({ error: "Invalid Bearer Token" });

    const token = authorization.split(" ").at(1) || "";

    try {
      const payload = await JwtAdapter.validateToken<{ id: string }>(token);

      if (!payload) return res.status(401).json({ error: "Invalid Token" });

      // Validate user in DB
      const user = await UserModel.findById(payload.id);

      if (!user)
        return res
          .status(401)
          .json({ error: "Invalid token - user not found" });

      req.body.user = user;

      next();
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
