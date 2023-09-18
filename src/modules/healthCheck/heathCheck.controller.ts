import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { HEALTH_CHECK } from '@config/constants/tags.constants';

@Controller('health')
@ApiTags(HEALTH_CHECK)
export class HealthCheckController {
  @Get()
  handler() {
    return null;
  }
}
