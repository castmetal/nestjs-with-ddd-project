import { User } from './user.entity';

export interface IUserRepository {
  createUser(user: User): Promise<User>;
  findByEmail(email: string): Promise<User>;
}
