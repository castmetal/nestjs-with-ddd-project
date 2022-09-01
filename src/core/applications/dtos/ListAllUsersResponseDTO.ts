import { UserScopeEnum } from '../../../core/domains/users/user.interfaces';

export class ListAllUsersResponseDTO {
  id: string;

  name: string;

  email: string;

  scope: UserScopeEnum;

  created_at: Date;

  updated_at: Date;
}
