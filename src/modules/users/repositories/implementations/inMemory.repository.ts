import { v4 as uuid } from 'uuid';

import { ICreateUserDTO } from '@modules/users/dto/ICreateUser.interface';
import { IUpdateUserDTO } from '@modules/users/dto/IUpdateUser.interface';
import { User } from '@modules/users/entity/User.entity';

import { IUserRepository } from '../userRepository.interface';

export class InMemoryUserRepository implements IUserRepository {
  private users: User[] = [];

  async create(data: ICreateUserDTO): Promise<User> {
    const { username, email, fullName, password } = data;
    const user = new User();

    Object.assign(user, { id: uuid(), username, email, fullName, password });

    this.users.push(user);

    return user;
  }

  async save(data: IUpdateUserDTO): Promise<User> {
    const { id, username, email, fullName } = data;

    const index = this.users.findIndex((item) => item.id === id);

    Object.assign(this.users[index], { id, username, email, fullName });

    return this.users[index];
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);

    if (!user?.deletedAt || user) {
      return user ?? null;
    }
    return null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null;
  }

  async disable(id: string): Promise<User | undefined> {
    const index = this.users.findIndex((item) => item.id === id);
    const user = this.users[index];

    if (user) {
      Object.assign(user, { deletedAt: new Date() });
      return user;
    }
    return undefined;
  }
}
