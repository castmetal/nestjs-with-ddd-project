import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsEmail,
} from 'class-validator';
import { UserScopeEnum } from '../../../core/domains/users/user.interfaces';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  @IsEnum(UserScopeEnum, { each: true })
  scope: UserScopeEnum;
}
