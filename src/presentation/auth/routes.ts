import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const datasource = new AuthDatasourceImpl();
    const authRepository = new AuthRepositoryImpl(datasource);
    const controller = new AuthController(authRepository);

    // Definir rutas principales
    //@ts-ignore
    router.post("/login", controller.loginUser);
    //@ts-ignore
    router.post("/register", controller.createUser);
    //@ts-ignore
    router.get("/", [AuthMiddleware.validateJWT], controller.getUsers);

    return router;
  }
}
