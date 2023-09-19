import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';

import { MongoLogger } from '@config/logger';
import { dataSourceOptions } from '@config/typeorm';

import { AuthenticationModule } from '@modules/authentication/authentication.module';
import { HealthCheckModule } from '@modules/healthCheck/healthCheck.module';
import { UserModule } from '@modules/users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: MongoLogger,
      inject: [ConfigService],
    }),
    TypeOrmModule.forRoot({ ...dataSourceOptions, autoLoadEntities: true }),
    MongooseModule.forRoot(process.env.URL_CONNECTION ?? ''),
    AuthenticationModule,
    HealthCheckModule,
    UserModule,
  ],
})
export class AppModule {}
