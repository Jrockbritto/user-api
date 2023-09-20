import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ENCRYPT_PROVIDER } from '@config/constants/providers.constants';
import {
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
import { TokenRepository } from './repositories/implementations/token.repository';
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
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    LoginService,
    LogoutService,
    Logger,
    JwtStrategy,
    { provide: USER_REPOSITORY, useClass: UserRepository },
    { provide: TOKEN_REPOSITORY, useClass: TokenRepository },
    { provide: ENCRYPT_PROVIDER, useClass: BcryptProvider },
  ],
  controllers: [LoginController, LogoutController],
})
export class AuthenticationModule {}
