import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class AuthenticateUserDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
