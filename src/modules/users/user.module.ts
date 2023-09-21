import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ENCRYPT_PROVIDER } from '@config/constants/providers.constants';
import {
  REFRESH_TOKEN_REPOSITORY,
  TOKEN_REPOSITORY,
  USER_REPOSITORY,
} from '@config/constants/repositories.constants';

import { BcryptProvider } from '@shared/providers/EncryptProvider/implementations/bcrypt.provider';

import { RefreshTokenRepository } from '@modules/authentication/repositories/implementations/refreshToken.repository';
import { TokenRepository } from '@modules/authentication/repositories/implementations/token.repository';
import {
  RefreshToken,
  RefreshTokenSchema,
} from '@modules/authentication/schemas/refreshToken.schema';
import {
  Token,
  TokenSchema,
} from '@modules/authentication/schemas/token.schema';
import { User } from '@modules/users/entity/User.entity';

import { CreateUserController } from './contexts/createUser/createUser.controller';
import { CreateUserService } from './contexts/createUser/createUser.service';
import { DisableUserController } from './contexts/disableUser/disableUser.controller';
import { DisableUserService } from './contexts/disableUser/disableUser.service';
import { EditUserController } from './contexts/editUser/editUser.controller';
import { EditUserService } from './contexts/editUser/editUser.service';
import { GetUserController } from './contexts/getUser/getUser.controller';
import { GetUserService } from './contexts/getUser/getUser.service';
import { UserRepository } from './repositories/implementations/user.repository';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MongooseModule.forFeature([
      { name: Token.name, schema: TokenSchema },
      { name: RefreshToken.name, schema: RefreshTokenSchema },
    ]),
  ],
  providers: [
    CreateUserService,
    GetUserService,
    EditUserService,
    DisableUserService,
    { provide: USER_REPOSITORY, useClass: UserRepository },
    { provide: ENCRYPT_PROVIDER, useClass: BcryptProvider },
    { provide: TOKEN_REPOSITORY, useClass: TokenRepository },
    { provide: REFRESH_TOKEN_REPOSITORY, useClass: RefreshTokenRepository },
  ],
  controllers: [
    CreateUserController,
    GetUserController,
    EditUserController,
    DisableUserController,
  ],
})
export class UserModule {}
