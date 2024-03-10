import { IsEmail, IsString } from 'class-validator';
import {CreateUserMessages} from '../index.js';

export class LoginUserDto {
  @IsEmail({}, { message: CreateUserMessages.email.invalidFormat })
  public email: string;

  @IsString({ message: CreateUserMessages.password.invalidFormat })
  public password: string;
}
