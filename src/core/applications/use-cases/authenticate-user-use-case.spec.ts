import { Test } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserScopeEnum } from '../../../core/domains/users/user.interfaces';
import { CreateUserUseCase } from './create-user-use-case';
import { UserInMemoryRepository } from '../../../infra/repositories/in-memory-repositories/user-in-memory-repository';
import { AuthenticateUserUseCase } from './authenticate-user-use-case';
import configuration from '../../..//config/configuration';

describe('AuthenticateUserUseCase', () => {
  let useCase: AuthenticateUserUseCase;
  let useCaseCreate: CreateUserUseCase;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        JwtModule.register({ secret: configuration().security.jwt_secret }),
      ],
    }).compile();

    const userInMemoryRepo = new UserInMemoryRepository();

    const jwtService = moduleRef.get<JwtService>(JwtService);
    useCase = new AuthenticateUserUseCase(userInMemoryRepo, jwtService);
    useCaseCreate = new CreateUserUseCase(userInMemoryRepo);
  });

  describe('authenticateUser', () => {
    it('should return an authenticated user', async () => {
      const userFakeData = {
        id: faker.datatype.uuid(),
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        scope: UserScopeEnum.USER,
        created_at: faker.date.birthdate(),
        updated_at: faker.date.birthdate(),
      };

      const executeUseCaseCreate = await useCaseCreate.execute(userFakeData);
      expect(executeUseCaseCreate.name).toBe(userFakeData.name);

      const executeUseCase = await useCase.execute({
        email: userFakeData.email,
        password: userFakeData.password,
      });
      expect(executeUseCase.name).toBe(userFakeData.name);
    });
  });
});
