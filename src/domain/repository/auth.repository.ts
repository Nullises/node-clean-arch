import { CreateUserDto } from "../dto/auth/create-user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthRepository {
  // abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;
  abstract create(createUserDto: CreateUserDto): Promise<UserEntity>;
}
