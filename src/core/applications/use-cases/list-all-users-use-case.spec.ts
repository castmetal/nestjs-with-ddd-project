import { Forbidden } from '../../../core/domains/common/errors/exceptions/Forbidden';
import { UserScopeEnum } from '../../../core/domains/users/user.interfaces';
import { UserInMemoryRepository } from '../../../infra/repositories/in-memory-repositories/user-in-memory-repository';
import { ListAllUsersDTO } from '../dtos/ListAllUsersDTO';
import { ListAllUsersUseCase } from './list-all-users-use-case';

class NoErrorThrownError extends Error {}

const getError = async <TError>(call: () => unknown): Promise<TError> => {
  try {
    await call();

    throw new NoErrorThrownError();
  } catch (error: unknown) {
    return error as TError;
  }
};

describe('ListAllUsersUseCase', () => {
  let useCase: ListAllUsersUseCase;

  beforeEach(async () => {
    const userInMemoryRepo = new UserInMemoryRepository();

    useCase = new ListAllUsersUseCase(userInMemoryRepo);
  });

  describe('list All Users as an Admin client', () => {
    it('should return page 0', async () => {
      const listAllUsersDTO: ListAllUsersDTO = {
        offset: 0,
        limit: 0,
        userScope: UserScopeEnum.ADMIN,
      };

      const executeUseCase = await useCase.execute(listAllUsersDTO);
      expect(executeUseCase).toBeTruthy();
    });
  });

  describe('list All Users as an User client', () => {
    it('should return forbidden', async () => {
      const listAllUsersDTO: ListAllUsersDTO = {
        offset: 0,
        limit: 0,
        userScope: UserScopeEnum.USER,
      };

      const t = await getError<Forbidden>(async () => {
        return await useCase.execute(listAllUsersDTO);
      });

      expect(t).toBeInstanceOf(Forbidden);
    });
  });
});
