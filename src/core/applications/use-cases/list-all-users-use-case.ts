import { IUserRepository } from '../../../core/domains/users/iuser.repository';
import { validateClass } from '../../../core/domains/common/errors/validateFields';
import { Forbidden } from '../../../core/domains/common/errors/exceptions/Forbidden';
import { ListAllUsersDTO } from '../dtos/ListAllUsersDTO';
import { ListAllUsersResponseDTO } from '../dtos/ListAllUsersResponseDTO';
import { UserScopeEnum } from '../../../core/domains/users/user.interfaces';

export class ListAllUsersUseCase {
  constructor(private readonly _userRepository: IUserRepository) {}

  async execute(
    listAllUsersDTO: ListAllUsersDTO,
  ): Promise<ListAllUsersResponseDTO[]> {
    if (listAllUsersDTO.userScope !== UserScopeEnum.ADMIN) {
      throw new Forbidden();
    }

    await validateClass(listAllUsersDTO, ListAllUsersDTO);

    const listUsersData = await this._userRepository.listAll(
      listAllUsersDTO.limit,
      listAllUsersDTO.offset,
    );

    return listUsersData.map((user) => user.toJson());
  }
}
