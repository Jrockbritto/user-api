import { Inject, Injectable } from '@nestjs/common';
import { LoggerService } from '@nestjs/common/services';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import {
  REFRESH_TOKEN_REPOSITORY,
  TOKEN_REPOSITORY,
} from '@config/constants/repositories.constants';

import { LogoutRequestDTO } from '@modules/authentication/dto/logout.dto';
import { IRefreshTokenRepository } from '@modules/authentication/repositories/refreshToken.interface';
import { ITokenRepository } from '@modules/authentication/repositories/token.interface';

@Injectable()
export class LogoutService {
  constructor(
    @Inject(TOKEN_REPOSITORY)
    private tokenRepository: ITokenRepository,
    @Inject(REFRESH_TOKEN_REPOSITORY)
    private refreshTokenRepository: IRefreshTokenRepository,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async execute({ userId }: LogoutRequestDTO): Promise<void> {
    await this.tokenRepository.destroy(userId);
    await this.refreshTokenRepository.destroy(userId);

    this.logger.log(
      `User ${userId} successifully logged out`,
      LogoutService.name,
    );
  }
}
