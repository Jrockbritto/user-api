import { Inject, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';

import { USER_REPOSITORY } from '@config/constants/repositories.constants';

import { EditUserDTO } from '@modules/users/dto/editUser.dto';
import { User } from '@modules/users/entity/User.entity';
import { IUserRepository } from '@modules/users/repositories/userRepository.interface';

@Injectable()
export class EditUserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}
  async execute({ userId, data }: EditUserDTO): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('user-not-found');
    }

    Object.assign(user, data);

    await this.userRepository.save(user);

    return user;
  }
}
