import { Repository } from 'typeorm';
import { IUserRepository } from 'src/core/domains/users/iuser.repository';
import { User } from 'src/core/domains/users/user.entity';

export class UserRepository implements IUserRepository {
  constructor(private ormRepo: Repository<User>) {}

  /**
   * Create User into database
   */
  async createUser(user: User): Promise<User> {
    return await this.ormRepo.save(user);
  }

  /**
   * Find One User By Email
   */
  async findByEmail(email: string): Promise<User> {
    return await this.ormRepo.findOneBy({ email });
  }
}
