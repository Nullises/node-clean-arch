import { CreateUserDto, UserEntity } from "../../domain";
import { AuthDataSource } from "../../domain/datasources";
import { AuthRepository } from "../../domain/repository";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDatasource: AuthDataSource) {}

  create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.authDatasource.create(createUserDto);
  }
}
