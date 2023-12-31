import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ICreateUserDTO } from '@modules/users/dto/ICreateUser.interface';
import { User } from '@modules/users/entity/User.entity';

import { IUserRepository } from '../userRepository.interface';

export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  create(data: ICreateUserDTO): Promise<User> {
    const user = this.repository.create(data);
    return this.repository.save(user);
  }

  save(data: ICreateUserDTO): Promise<User> {
    return this.repository.save(data);
  }

  findById(id: string): Promise<User | null> {
    return this.repository.findOne({ where: { id } });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }

  async disable(id: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ where: { id } });
    if (user) {
      Object.assign(user, { deletedAt: new Date() });
      return await this.repository.save(user);
    }
  }
}
