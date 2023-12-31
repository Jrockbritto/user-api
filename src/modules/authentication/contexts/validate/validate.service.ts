import { Inject, Injectable } from '@nestjs/common';
import {
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { LoggerService } from '@nestjs/common/services';
import { verify, sign } from 'jsonwebtoken';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import {
  REFRESH_TOKEN_REPOSITORY,
  TOKEN_REPOSITORY,
} from '@config/constants/repositories.constants';
import env from '@config/env';

import {
  ValidateDTO,
  ValidateResponseDTO,
} from '@modules/authentication/dto/validate.dto';
import { IRefreshTokenRepository } from '@modules/authentication/repositories/refreshToken.interface';
import { ITokenRepository } from '@modules/authentication/repositories/token.interface';

@Injectable()
export class ValidateService {
  constructor(
    @Inject(TOKEN_REPOSITORY)
    private tokenRepository: ITokenRepository,
    @Inject(REFRESH_TOKEN_REPOSITORY)
    private refreshTokenRepository: IRefreshTokenRepository,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async execute({
    refreshToken,
    user,
  }: ValidateDTO): Promise<ValidateResponseDTO | void> {
    if (refreshToken) {
      const JwtConfig = env().jwt;

      if (!JwtConfig.token) {
        this.logger.error(
          `No secretOrPrivateKey for the JWT was provided.`,
          ValidateService.name,
        );
        throw new InternalServerErrorException();
      }
      try {
        verify(refreshToken, JwtConfig.token);
      } catch (err) {
        throw new UnauthorizedException();
      }

      const token = sign({}, JwtConfig.token, {
        subject: user.id,
        expiresIn: JwtConfig.expiresIn,
      });

      const newRefreshToken = sign({}, JwtConfig.token, {
        subject: user.id,
        expiresIn: JwtConfig.refreshExpiresIn,
      });

      await this.tokenRepository.renew({ userId: user.id, token });
      await this.refreshTokenRepository.renew({
        userId: user.id,
        token: newRefreshToken,
      });

      this.logger.log(
        `User ${user.id} was successifully issued with a new token and refresh token.`,
        ValidateService.name,
      );

      return { user, token, refreshToken: newRefreshToken };
    }
  }
}
