import { Logger, Module } from '@nestjs/common';

import { Seeder } from './seed';

@Module({
  providers: [Logger, Seeder],
})
export class SeederModule {}
