import { JwtService } from '@nestjs/jwt';
import { IUserRepository } from '../../../core/domains/users/iuser.repository';
import { validateClass } from '../../../core/domains/common/errors/validateFields';
import { AuthenticateUserDTO } from '../dtos/AuthenticateUserDTO';
import { UserNotExists } from '../../../core/domains/common/errors/exceptions/UserNotExists';
import { AuthenticateUserResponseDTO } from '../dtos/AuthenticateUserResponseDTO';
import { validPassword } from '../../../core/domains/common/helpers/security';
import { InvalidPassword } from '../../../core/domains/common/errors/exceptions/InvalidPassword';
import configuration from '../../../config/configuration';

export class AuthenticateUserUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(
    authenticateUserUseCaseDTO: AuthenticateUserDTO,
  ): Promise<AuthenticateUserResponseDTO> {
    await validateClass(authenticateUserUseCaseDTO, AuthenticateUserDTO);

    const userExists = await this._userRepository.findByEmail(
      authenticateUserUseCaseDTO.email,
    );

    if (!userExists || userExists.id === '') {
      throw new UserNotExists();
    }

    const isValidPassword = validPassword(
      authenticateUserUseCaseDTO.password,
      userExists.password,
      userExists.salt,
    );

    if (!isValidPassword) {
      throw new InvalidPassword();
    }

    const token = this.jwtService.sign(
      {
        userId: userExists.id,
        email: userExists.email,
        scope: userExists.scope,
      },
      { secret: configuration().security.jwt_secret },
    );

    return {
      id: userExists.id,
      email: userExists.email,
      name: userExists.name,
      token,
    };
  }
}
