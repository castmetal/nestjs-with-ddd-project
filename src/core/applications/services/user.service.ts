import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { CreateUserResponseDTO } from '../dtos/CreateUserResponseDTO';
import { CreateUserUseCase } from '../use-cases/create-user-use-case';

export type HealthCheckResponse = {
  status: boolean;
};

@Injectable()
export class UserService {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async createUser(
    createUserDTO: CreateUserDTO,
  ): Promise<CreateUserResponseDTO> {
    return await this.createUserUseCase.execute(createUserDTO);
  }
}
