import { Request, Response } from "express";
import {
  CreateUserDto,
  CreateUserUseCaseImpl,
  CustomError,
  LoginUserDto,
  LoginUserUseCaseImpl,
} from "../../domain";
import { AuthRepository } from "../../domain";
import { UserModel } from "../../data/mongodb/models/user.model";
export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({
      error: "Internal Server Error",
    });
  };

  createUser = async (req: Request, res: Response) => {
    const [error, createUserDto] = CreateUserDto.create(req.body);

    if (error) return res.status(400).json({ error });

    new CreateUserUseCaseImpl(this.authRepository)
      .execute(createUserDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  loginUser = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.login(req.body);
    if (error) return res.status(400).json({ error });

    new LoginUserUseCaseImpl(this.authRepository)
      .execute(loginUserDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  getUsers = (req: Request, res: Response) => {
    UserModel.find()
      .then((users) => {
        res.json({
          user: req.body.user,
        });
      })
      .catch(() => res.status(500).json({ error: "Internal server error" }));
  };
}
