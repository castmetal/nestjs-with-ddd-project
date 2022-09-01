import { Injectable } from '@nestjs/common';
import { User } from '../../../core/domains/users/user.entity';
import { CreateUserDTO } from '../../../core/applications/dtos/CreateUserDTO';
import { IUserRepository } from 'src/core/domains/users/iuser.repository';
import { isNotEmpty } from 'class-validator';

@Injectable()
export class UserInMemoryRepository implements IUserRepository {
  private users: User[];
  constructor() {
    this.users = [];
  }

  /**
   * Create User into database
   */
  async createUser(createUserDTO: CreateUserDTO) {
    const user = User.create(createUserDTO);
    this.users.push(user);

    return user;
  }

  /**
   * Find One User By Email
   */
  async findByEmail(email: string): Promise<User> {
    for (const item of this.users) {
      if (item.email === email) {
        return item;
      }
    }

    return null;
  }
}
