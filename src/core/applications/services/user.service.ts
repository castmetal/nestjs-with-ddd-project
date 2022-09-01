import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { CreateUserResponseDTO } from '../dtos/CreateUserResponseDTO';
import { ListAllUsersDTO } from '../dtos/ListAllUsersDTO';
import { ListAllUsersResponseDTO } from '../dtos/ListAllUsersResponseDTO';
import { CreateUserUseCase } from '../use-cases/create-user-use-case';
import { ListAllUsersUseCase } from '../use-cases/list-all-users-use-case';

export type HealthCheckResponse = {
  status: boolean;
};

@Injectable()
export class UserService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly listAllUsersUseCase: ListAllUsersUseCase,
  ) {}

  async createUser(
    createUserDTO: CreateUserDTO,
  ): Promise<CreateUserResponseDTO> {
    return await this.createUserUseCase.execute(createUserDTO);
  }

  async listAllUsers(
    listAllUsersDTO: ListAllUsersDTO,
  ): Promise<ListAllUsersResponseDTO[]> {
    return await this.listAllUsersUseCase.execute(listAllUsersDTO);
  }
}
