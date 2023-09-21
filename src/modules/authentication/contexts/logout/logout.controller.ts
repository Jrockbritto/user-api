import {
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { AUTHENTICATION } from '@config/constants/tags.constants';

import { JwtAuthGuard } from '@modules/authentication/guards/jwtAuth.guard';
import { User } from '@modules/users/entity/User.entity';

import { LogoutService } from './logout.service';

@ApiTags(AUTHENTICATION)
@Controller(AUTHENTICATION.toLowerCase())
@ApiBearerAuth()
export class LogoutController {
  constructor(private readonly logoutService: LogoutService) {}
  @Post('/logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  async handler(@Req() request: Request): Promise<void> {
    await this.logoutService.execute({ userId: (request.user as User).id });
  }
}
