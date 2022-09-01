import { UserScopeEnum } from '../../../core/domains/users/user.interfaces';
import { User } from '../../../core/domains/users/user.entity';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { IUserRepository } from '../../../core/domains/users/iuser.repository';
import { validateClass } from '../../../core/domains/common/errors/validateFields';
import { isRequestedFromAdmin } from '../../../core/domains/common/helpers/isRequestedFromAdmin';
import { CreateUserResponseDTO } from '../dtos/CreateUserResponseDTO';
import { UserAlreadyExists } from '../../../core/domains/common/errors/exceptions/UserAlreadyExists';

export class CreateUserUseCase {
  constructor(private readonly _userRepository: IUserRepository) {}

  async execute(createUserDTO: CreateUserDTO): Promise<CreateUserResponseDTO> {
    const { scope } = createUserDTO;
    let _scope = UserScopeEnum.USER;

    if (isRequestedFromAdmin()) {
      _scope = scope;
    }

    await validateClass(createUserDTO, CreateUserDTO);

    const userExists = await this._userRepository.findByEmail(
      createUserDTO.email,
    );

    if (userExists && userExists.name !== '') {
      throw new UserAlreadyExists();
    }

    const userCreateEntity = User.create(createUserDTO);

    const user = await this._userRepository.createUser(userCreateEntity);

    return user.toJson();
  }
}
