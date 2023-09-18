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
    const user = new User();

    Object.assign(user, { id, username, email, fullName });
    const index = this.users.findIndex((item) => item.id === user.id);
    this.users[index] = user;

    return user;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null;
  }
}
