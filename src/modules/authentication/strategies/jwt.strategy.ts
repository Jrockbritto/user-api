import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from 'jsonwebtoken';
import { ExtractJwt, Strategy } from 'passport-jwt';

import {
  TOKEN_REPOSITORY,
  USER_REPOSITORY,
} from '@config/constants/repositories.constants';
import env from '@config/env';

import { IUserRepository } from '@modules/users/repositories/userRepository.interface';

import { ITokenRepository } from '../repositories/token.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(TOKEN_REPOSITORY)
    private tokenRepository: ITokenRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env().jwt.token,
    });
  }

  async validate(payload: JwtPayload) {
    if (!payload.sub) {
      throw new UnauthorizedException();
    }
    const user = await this.userRepository.findById(payload.sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    const activeToken = await this.tokenRepository.findByUserId(user.id);

    if (!activeToken) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
