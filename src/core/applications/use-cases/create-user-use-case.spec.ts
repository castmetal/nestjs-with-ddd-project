import { faker } from '@faker-js/faker';
import { UserScopeEnum } from '../../../core/domains/users/user.interfaces';
import { CreateUserUseCase } from './create-user-use-case';
import { UserInMemoryRepository } from '../../../infra/repositories/in-memory-repositories/user-in-memory-repository';

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;

  beforeEach(async () => {
    const userInMemoryRepo = new UserInMemoryRepository();

    useCase = new CreateUserUseCase(userInMemoryRepo);
  });

  describe('createUser', () => {
    it('should return a valid entity', async () => {
      const userFakeData = {
        id: faker.datatype.uuid(),
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        scope: UserScopeEnum.USER,
        created_at: faker.date.birthdate(),
        updated_at: faker.date.birthdate(),
      };

      const executeUseCase = await useCase.execute(userFakeData);
      expect(executeUseCase.name).toBe(userFakeData.name);
    });
  });
});
