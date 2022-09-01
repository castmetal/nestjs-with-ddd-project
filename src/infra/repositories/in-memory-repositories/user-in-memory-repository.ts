import { Injectable } from '@nestjs/common';
import { User } from '../../../core/domains/users/user.entity';
import { CreateUserDTO } from '../../../core/applications/dtos/CreateUserDTO';
import { IUserRepository } from 'src/core/domains/users/iuser.repository';

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

  async listAll(offset: number, limit: number): Promise<User[]> {
    const resultItems = [];
    let items = 0;
    let currentOffset = 0;

    for (const item of this.users) {
      if (items - 1 === limit) {
        items = 0;
        currentOffset++;

        continue;
      }

      if (currentOffset === offset) {
        resultItems.push(item);
      }

      items++;
    }

    return resultItems;
  }
}
