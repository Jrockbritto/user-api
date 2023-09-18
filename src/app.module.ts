import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

import { dataSourceOptions } from '@config/typeorm';

import { AuthenticationModule } from '@modules/authentication/authentication.module';
import { HealthCheckModule } from '@modules/healthCheck/healthCheck.module';
import { UserModule } from '@modules/users/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...dataSourceOptions, autoLoadEntities: true }),
    MongooseModule.forRoot(process.env.URL_CONNECTION ?? ''),
    AuthenticationModule,
    HealthCheckModule,
    UserModule,
  ],
})
export class AppModule {}
