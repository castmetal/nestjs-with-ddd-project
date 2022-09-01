import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { UserScopeEnum } from '../../../core/domains/users/user.interfaces';

export class ListAllUsersDTO {
  @IsNumber()
  @Min(0)
  limit: number;

  @IsNumber()
  @Min(0)
  offset: number;

  @IsString()
  @IsOptional()
  @IsEnum(UserScopeEnum, { each: true })
  userScope?: UserScopeEnum;
}
