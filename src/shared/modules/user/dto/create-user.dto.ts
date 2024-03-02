import {
  IsString,
  Length,
  IsEmail,
  IsEnum,
  IsOptional
} from 'class-validator';
import {UserType} from '../../../const/user-type.enum.js';
import {CreateUserMessages} from './create-user.messages.js';

const {
  name,
  email,
  isPro,
  avatarUrl,
  password
} = CreateUserMessages;

export class CreateUserDto {

  @IsString({message: name.invalidFormat})
  @Length(1, 15, {message: name.lengthField})
  public name: string;

  @IsEmail({}, {message: email.invalidFormat})
  public email: string;

  @IsOptional()
  @IsString({message: avatarUrl.invalidFormat})
  public avatarUrl?: string;

  @IsEnum(UserType, {message: isPro.invalid})
  public isPro: string;

  @IsString({message: password.invalidFormat})
  @Length(6, 12, {message: password.lengthField})
  public password: string;
}
