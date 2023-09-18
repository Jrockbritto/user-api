import { v4 as uuid } from 'uuid';

import { ICreateUserDTO } from '@modules/users/dto/ICreateUser.interface';
import { User } from '@modules/users/entity/User.entity';

import { IUserRepository } from '../userRepository.interface';

export class InMemoryUserRepository implements IUserRepository {
  private users: User[] = [];

  async create(data: ICreateUserDTO): Promise<User> {
    const { name, email, lastName, password } = data;
    const user = new User();

    Object.assign(user, { id: uuid(), name, email, lastName, password });

    this.users.push(user);

    return user;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null;
  }
}
