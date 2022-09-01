import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticateUserDTO } from '../../core/applications/dtos/AuthenticateUserDTO';
import { AuthService } from '../../core/applications/services/auth.service';
import { AuthenticateUserResponseDTO } from 'src/core/applications/dtos/AuthenticateUserResponseDTO';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/user')
  async authUser(
    @Body() authenticateUserDTO: AuthenticateUserDTO,
  ): Promise<AuthenticateUserResponseDTO> {
    return this.authService.authenticateUser(authenticateUserDTO);
  }
}
