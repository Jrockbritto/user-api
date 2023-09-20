import { Inject, Injectable } from '@nestjs/common';

import { TOKEN_REPOSITORY } from '@config/constants/repositories.constants';

import { LogoutRequestDTO } from '@modules/authentication/dto/logout.dto';
import { ITokenRepository } from '@modules/authentication/repositories/token.interface';

@Injectable()
export class LogoutService {
  constructor(
    @Inject(TOKEN_REPOSITORY)
    private tokenRepository: ITokenRepository,
  ) {}

  async execute({ userId }: LogoutRequestDTO): Promise<void> {
    await this.tokenRepository.destroy(userId);
  }
}
