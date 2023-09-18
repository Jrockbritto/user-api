import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ENCRYPT_PROVIDER } from '@config/constants/providers.constants';
import { USER_REPOSITORY } from '@config/constants/repositories.constants';

import { BcryptProvider } from '@shared/providers/EncryptProvider/implementations/bcrypt.provider';

import { User } from '@modules/users/entity/User.entity';
import { UserRepository } from '@modules/users/repositories/implementations/user.repository';

import { LoginController } from './contexts/login/login.controller';
import { LoginService } from './contexts/login/login.service';
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
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    LoginService,
    Logger,
    JwtStrategy,
    { provide: USER_REPOSITORY, useClass: UserRepository },
    { provide: ENCRYPT_PROVIDER, useClass: BcryptProvider },
  ],
  controllers: [LoginController],
})
export class AuthenticationModule {}
