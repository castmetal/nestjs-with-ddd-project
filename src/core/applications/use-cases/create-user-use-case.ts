import { User } from '../../../core/domains/users/user.entity';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { IUserRepository } from '../../../core/domains/users/iuser.repository';
import { validateClass } from '../../../core/domains/common/errors/validateFields';
import { CreateUserResponseDTO } from '../dtos/CreateUserResponseDTO';
import { UserAlreadyExists } from '../../../core/domains/common/errors/exceptions/UserAlreadyExists';
import { Forbidden } from '../../../core/domains/common/errors/exceptions/Forbidden';

export class CreateUserUseCase {
  constructor(private readonly _userRepository: IUserRepository) {}

  async execute(createUserDTO: CreateUserDTO): Promise<CreateUserResponseDTO> {
    await validateClass(createUserDTO, CreateUserDTO);

    const userExists = await this._userRepository.findByEmail(
      createUserDTO.email,
    );

    if (
      createUserDTO.scope === 'admin' &&
      createUserDTO.userScope !== 'admin'
    ) {
      throw new Forbidden();
    }

    if (userExists && userExists.name !== '') {
      throw new UserAlreadyExists();
    }

    const userCreateEntity = User.create(createUserDTO);

    const user = await this._userRepository.createUser(userCreateEntity);

    return user.toJson();
  }
}
