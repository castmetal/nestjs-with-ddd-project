import {
  Body,
  Controller,
  Get,
  Inject,
  Injectable,
  Param,
  Post,
  Scope,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request as RequestExpress } from 'express';
import { CreateUserResponseDTO } from '../../core/applications/dtos/CreateUserResponseDTO';
import { CreateUserDTO } from '../../core/applications/dtos/CreateUserDTO';
import { UserService } from '../../core/applications/services/user.service';
import { ListAllUsersResponseDTO } from '../../core/applications/dtos/ListAllUsersResponseDTO';
import { ListAllUsersDTO } from '../../core/applications/dtos/ListAllUsersDTO';
import { UserScopeDecorator } from '../../core/domains/common/middlewares/auth.middleware';
import { UserScopeEnum } from '../../core/domains/users/user.interfaces';

@Controller('users')
@Injectable({ scope: Scope.REQUEST })
export class UserController {
  constructor(
    @Inject(REQUEST) private readonly request: RequestExpress,
    private readonly userService: UserService,
  ) {}

  @Post('/')
  async createUser(
    @Body() createUserDTO: CreateUserDTO,
    @UserScopeDecorator() userScope,
  ): Promise<CreateUserResponseDTO> {
    if (userScope !== 'admin') {
      createUserDTO.scope = UserScopeEnum.USER;
    }

    return this.userService.createUser(createUserDTO);
  }

  @Get('/')
  async listAllUsers(
    @Param('offset') offset: number,
    @Param('limit') limit: number,
    @UserScopeDecorator() userScope,
  ): Promise<ListAllUsersResponseDTO[]> {
    const listAllUsersDTO: ListAllUsersDTO = {
      offset: offset ?? 0,
      limit: limit ?? 0,
      userScope,
    };

    return this.userService.listAllUsers(listAllUsersDTO);
  }
}
