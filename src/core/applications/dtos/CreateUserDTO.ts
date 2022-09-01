import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsEmail,
  Min,
  MinLength,
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
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  @IsEnum(UserScopeEnum, { each: true })
  scope: UserScopeEnum;

  @IsString()
  @IsOptional()
  @IsEnum(UserScopeEnum, { each: true })
  userScope?: UserScopeEnum;

  @IsString()
  @IsOptional()
  salt?: string;
}
