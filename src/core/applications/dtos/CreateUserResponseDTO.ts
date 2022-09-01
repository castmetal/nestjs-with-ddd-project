import { UserScopeEnum } from '../../../core/domains/users/user.interfaces';

export class CreateUserResponseDTO {
  id: string;

  name: string;

  email: string;

  password: string;

  scope: UserScopeEnum;

  created_at: Date;

  updated_at: Date;
}
