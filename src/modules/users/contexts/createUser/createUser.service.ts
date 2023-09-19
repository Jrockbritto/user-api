import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { ConflictException } from '@nestjs/common/exceptions';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

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
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}
  async execute({
    email,
    fullName,
    biography,
    username,
    password,
  }: CreateUserDTO): Promise<User | void> {
    try {
      const emailValidation = await this.userRepository.findByEmail(email);

      if (emailValidation) {
        throw new ConflictException('email-already-in-use');
      }

      const user = await this.userRepository.create({
        email,
        fullName,
        biography,
        username,
        password: await this.encryptProvider.generateHash(password),
      });

      this.logger.error(`User ${user.id} created`, CreateUserService.name);
      return user;
    } catch (err) {
      this.logger.error(`Error creating user`, CreateUserService.name);
    }
  }
}
