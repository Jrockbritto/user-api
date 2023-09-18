import { Module } from '@nestjs/common';

import { HealthCheckController } from './heathCheck.controller';

@Module({
  controllers: [HealthCheckController],
})
export class HealthCheckModule {}
