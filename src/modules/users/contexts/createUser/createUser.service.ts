import { Inject, Injectable } from '@nestjs/common';
import { ConflictException } from '@nestjs/common/exceptions';

import { ENCRYPT_PROVIDER } from '@config/constants/providers.constants';
import { USER_REPOSITORY } from '@config/constants/repositories.constants';

import { IEncryptProvider } from '@shared/providers/EncryptProvider/encryptProvider.interface';

import { CreateUserDTO } from '@modules/users/dto/createUser.dto';
import { User } from '@modules/users/entity/User.entity';
import { IUserRepository } from '@modules/users/repositories/userRepository.interface';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(ENCRYPT_PROVIDER)
    private readonly encryptProvider: IEncryptProvider,
  ) {}
  async execute({
    email,
    fullName,
    biography,
    username,
    password,
  }: CreateUserDTO): Promise<User> {
    const emailValidation = await this.userRepository.findByEmail(email);

    if (emailValidation) {
      throw new ConflictException('email-already-in-use');
    }

    return this.userRepository.create({
      email,
      fullName,
      biography,
      username,
      password: await this.encryptProvider.generateHash(password),
    });
  }
}
