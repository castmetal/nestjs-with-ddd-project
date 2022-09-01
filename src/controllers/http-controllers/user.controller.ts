import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserResponseDTO } from 'src/core/applications/dtos/CreateUserResponseDTO';
import { CreateUserDTO } from '../../core/applications/dtos/CreateUserDTO';
import { UserService } from '../../core/applications/services/user.service';
import { User } from '../../core/domains/users/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  async createUser(
    @Body() createUserDTO: CreateUserDTO,
  ): Promise<CreateUserResponseDTO> {
    return this.userService.createUser(createUserDTO);
  }
}
