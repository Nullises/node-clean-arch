import { CreateUserDto } from "../dto/auth/create-user.dto";
import { LoginUserDto } from "../dto/auth/login-user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthDataSource {
  abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;

  abstract create(createUserDto: CreateUserDto): Promise<UserEntity>;
}
