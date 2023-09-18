import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class Seeder {
  constructor(private readonly logger: Logger) {}
  public async seed() {
    try {
      this.logger.debug('Successfully completed seeding times');
    } catch (error) {
      this.logger.debug('Failed seeding user');
    }
  }
}
