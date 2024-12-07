import { CreateUserDto, LoginUserDto, UserEntity } from "../../domain";
import { AuthDataSource } from "../../domain/datasources";
import { AuthRepository } from "../../domain/repository";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDatasource: AuthDataSource) {}
  login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    return this.authDatasource.login(loginUserDto);
  }

  create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.authDatasource.create(createUserDto);
  }
}
