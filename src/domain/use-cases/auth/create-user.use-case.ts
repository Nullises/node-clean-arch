import { JwtAdapter } from "../../../config";
import { CreateUserDto } from "../../dto";
import { CustomError } from "../../errors";
import { AuthRepository } from "../../repository";

interface UserToken {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

interface CreateUserUseCase {
  execute(createUserDto: CreateUserDto): Promise<UserToken>;
}

export class CreateUserUseCaseImpl implements CreateUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<UserToken> {
    // Crear usuario
    const user = await this.authRepository.create(createUserDto);

    // Token
    const token = await this.signToken({ id: user.id }, "2h");
    if (!token) throw CustomError.internalServer("Error generating token");

    return {
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
