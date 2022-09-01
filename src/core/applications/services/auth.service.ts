import { Injectable } from '@nestjs/common';
import { AuthenticateUserDTO } from '../dtos/AuthenticateUserDTO';
import { AuthenticateUserResponseDTO } from '../dtos/AuthenticateUserResponseDTO';
import { AuthenticateUserUseCase } from '../use-cases/authenticate-user-use-case';

export type HealthCheckResponse = {
  status: boolean;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly authenticateUserUseCase: AuthenticateUserUseCase,
  ) {}

  async authenticateUser(
    authenticateUserUseCaseDTO: AuthenticateUserDTO,
  ): Promise<AuthenticateUserResponseDTO> {
    return await this.authenticateUserUseCase.execute(
      authenticateUserUseCaseDTO,
    );
  }
}
