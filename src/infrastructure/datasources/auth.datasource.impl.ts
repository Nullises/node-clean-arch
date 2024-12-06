import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data";
import { CreateUserDto, UserEntity } from "../../domain";
import { AuthDataSource } from "../../domain/datasources";
import { CustomError } from "../../domain/errors/custom.error";
import { UserMapper } from "../mappers";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDatasourceImpl implements AuthDataSource {
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { name, email, password } = createUserDto;

    try {
      // 1. Verificar si el correo existe
      const exists = await UserModel.findOne({ email });
      if (exists) throw CustomError.badRequest("User already exists");

      // 2. Hash de la contraseña
      const userData = await UserModel.create({
        name: name,
        email: email,
        password: this.hashPassword(password),
      });

      await userData.save();

      // 3. Mapear la respuesta de nuestra entidad

      return UserMapper.userEntityFromObject(userData);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}