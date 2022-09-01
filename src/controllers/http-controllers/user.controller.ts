import {
  Body,
  Controller,
  Get,
  Inject,
  Injectable,
  Param,
  Post,
  Req,
  Scope,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request as RequestExpress } from 'express';
import { CreateUserResponseDTO } from '../../core/applications/dtos/CreateUserResponseDTO';
import { CreateUserDTO } from '../../core/applications/dtos/CreateUserDTO';
import { UserService } from '../../core/applications/services/user.service';
import { ListAllUsersResponseDTO } from '../../core/applications/dtos/ListAllUsersResponseDTO';
import { ListAllUsersDTO } from '../../core/applications/dtos/ListAllUsersDTO';
import { UserScopeEnum } from '../../core/domains/users/user.interfaces';
import { UserScopeDecorator } from '../..//core/domains/common/middlewares/auth.middleware';

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
    @Param('userScope') userScope: UserScopeEnum,
  ): Promise<CreateUserResponseDTO> {
    createUserDTO.scope = userScope;

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
