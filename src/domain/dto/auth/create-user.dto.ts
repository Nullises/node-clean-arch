import { Validators } from "../../../config";

export class CreateUserDto {
  private constructor(
    public name: string,
    public email: string,
    public password: string
  ) {}

  static create(payload: { [key: string]: any }): [string?, CreateUserDto?] {
    const { name, email, password } = payload;

    if (!name) return ["Missing name"];
    if (!email) return ["Missing email"];
    if (!Validators.email.test(email)) return ["Email invalid"];
    if (!password) return ["Missing password"];
    if (password.length < 6) return ["Password too short"];

    return [undefined, new CreateUserDto(name, email, password)];
  }
}
