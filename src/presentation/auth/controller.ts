import { Request, Response } from "express";
import { CreateUserDto, CustomError } from "../../domain";
import { AuthRepository } from "../../domain";
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

    try {
      const userCreated = await this.authRepository.create(createUserDto!);

      if (userCreated) {
        return res.json(userCreated);
      }
    } catch (error) {
      this.handleError(error, res);
    }
  };

  loginUser = async (req: Request, res: Response) => {
    res.json("Login Controller");
  };
}
