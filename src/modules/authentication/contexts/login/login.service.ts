import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common/exceptions';
import { LoggerService } from '@nestjs/common/services';
import { sign } from 'jsonwebtoken';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { ENCRYPT_PROVIDER } from '@config/constants/providers.constants';
import {
  REFRESH_TOKEN_REPOSITORY,
  TOKEN_REPOSITORY,
  USER_REPOSITORY,
} from '@config/constants/repositories.constants';
import env from '@config/env';

import { IEncryptProvider } from '@shared/providers/EncryptProvider/encryptProvider.interface';

import {
  LoginRequestDTO,
  LoginResponseDTO,
} from '@modules/authentication/dto/login.dto';
import { IRefreshTokenRepository } from '@modules/authentication/repositories/refreshToken.interface';
import { ITokenRepository } from '@modules/authentication/repositories/token.interface';
import { IUserRepository } from '@modules/users/repositories/userRepository.interface';

@Injectable()
export class LoginService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: IUserRepository,
    @Inject(TOKEN_REPOSITORY)
    private tokenRepository: ITokenRepository,
    @Inject(REFRESH_TOKEN_REPOSITORY)
    private refreshTokenRepository: IRefreshTokenRepository,
    @Inject(ENCRYPT_PROVIDER)
    private encryptProvider: IEncryptProvider,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async execute({
    email,
    password,
  }: LoginRequestDTO): Promise<LoginResponseDTO> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      this.logger.error(`No user found at Login`, LoginService.name);
      throw new UnauthorizedException('invalid-credentials');
    }

    const activeToken = await this.tokenRepository.findByUserId(user.id);

    if (activeToken) {
      this.logger.warn(`User ${user.id} already logged in`, LoginService.name);
      throw new ConflictException('user-already-logged');
    }

    const passwordMatched = await this.encryptProvider.compareHash(
      password,
      user?.password,
    );

    if (!passwordMatched) {
      this.logger.warn(
        `User ${user.id} provided invalid credentials`,
        LoginService.name,
      );
      throw new UnauthorizedException('invalid-credentials');
    }

    const JwtConfig = env().jwt;

    if (!JwtConfig.token) {
      this.logger.error(
        `No token for the JWT was provided.`,
        LoginService.name,
      );
      throw new InternalServerErrorException();
    }

    const token = sign({}, JwtConfig.token, {
      subject: user.id,
      expiresIn: JwtConfig.expiresIn,
    });

    const refreshToken = sign({}, JwtConfig.token, {
      subject: user.id,
      expiresIn: JwtConfig.refreshExpiresIn,
    });

    await this.tokenRepository.save({ userId: user.id, token });
    await this.refreshTokenRepository.save({
      userId: user.id,
      token: refreshToken,
    });

    this.logger.log(
      `User ${user.id} successifully logged in`,
      LoginService.name,
    );

    return { user, token, refreshToken };
  }
}
