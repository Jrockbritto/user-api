import { Inject, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';

import { USER_REPOSITORY } from '@config/constants/repositories.constants';

import { DisableUserDTO } from '@modules/users/dto/disableUser.dto';
import { User } from '@modules/users/entity/User.entity';
import { IUserRepository } from '@modules/users/repositories/userRepository.interface';

@Injectable()
export class DisableUserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}
  async execute({ userId }: DisableUserDTO): Promise<User | void> {
    const user = await this.userRepository.disable(userId);

    if (!user) {
      throw new NotFoundException('user-not-found');
    }

    return user;
  }
}
