import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common/exceptions';
import { sign } from 'jsonwebtoken';

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
  ) {}

  async execute({
    email,
    password,
  }: LoginRequestDTO): Promise<LoginResponseDTO> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('invalid-credentials');
    }

    const activeToken = await this.tokenRepository.findByUserId(user.id);

    if (activeToken) {
      throw new ConflictException('user-already-logged');
    }

    const passwordMatched = await this.encryptProvider.compareHash(
      password,
      user?.password,
    );

    if (!passwordMatched) {
      throw new UnauthorizedException('invalid-credentials');
    }

    const JwtConfig = env().jwt;

    if (!JwtConfig.token) {
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

    return { user, token, refreshToken };
  }
}
