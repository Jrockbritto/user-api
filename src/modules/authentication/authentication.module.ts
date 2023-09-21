import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ENCRYPT_PROVIDER } from '@config/constants/providers.constants';
import {
  REFRESH_TOKEN_REPOSITORY,
  TOKEN_REPOSITORY,
  USER_REPOSITORY,
} from '@config/constants/repositories.constants';

import { BcryptProvider } from '@shared/providers/EncryptProvider/implementations/bcrypt.provider';

import { User } from '@modules/users/entity/User.entity';
import { UserRepository } from '@modules/users/repositories/implementations/user.repository';

import { LoginController } from './contexts/login/login.controller';
import { LoginService } from './contexts/login/login.service';
import { LogoutController } from './contexts/logout/logout.controller';
import { LogoutService } from './contexts/logout/logout.service';
import { ValidateController } from './contexts/validate/validate.controller';
import { ValidateService } from './contexts/validate/validate.service';
import { RefreshTokenRepository } from './repositories/implementations/refreshToken.repository';
import { TokenRepository } from './repositories/implementations/token.repository';
import {
  RefreshToken,
  RefreshTokenSchema,
} from './schemas/refreshToken.schema';
import { Token, TokenSchema } from './schemas/token.schema';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwtSecret'),
        signOptions: {
          expiresIn: configService.get('expiresIn'),
        },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: Token.name, schema: TokenSchema },
      { name: RefreshToken.name, schema: RefreshTokenSchema },
    ]),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    LoginService,
    LogoutService,
    ValidateService,
    Logger,
    JwtStrategy,
    { provide: USER_REPOSITORY, useClass: UserRepository },
    { provide: TOKEN_REPOSITORY, useClass: TokenRepository },
    { provide: REFRESH_TOKEN_REPOSITORY, useClass: RefreshTokenRepository },
    { provide: ENCRYPT_PROVIDER, useClass: BcryptProvider },
  ],
  controllers: [LoginController, LogoutController, ValidateController],
})
export class AuthenticationModule {}
