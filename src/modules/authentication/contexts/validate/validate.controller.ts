import {
  Controller,
  Get,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common/decorators';
import { ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { Request } from 'express';

import { AUTHENTICATION } from '@config/constants/tags.constants';

import { EmptyResponseInterceptor } from '@shared/interceptors/emptyResponse.interceptor';

import {
  ValidateRequestDTO,
  ValidateResponseDTO,
} from '@modules/authentication/dto/validate.dto';
import { JwtAuthGuard } from '@modules/authentication/guards/jwtAuth.guard';
import { User } from '@modules/users/entity/User.entity';

import { ValidateService } from './validate.service';

@ApiTags(AUTHENTICATION)
@Controller(AUTHENTICATION.toLowerCase())
export class ValidateController {
  constructor(private readonly validateService: ValidateService) {}
  @ApiOkResponse({ type: ValidateResponseDTO })
  @ApiNoContentResponse()
  @UseInterceptors(EmptyResponseInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get('/validate')
  async handler(
    @Query() { refreshToken }: ValidateRequestDTO,
    @Req() req: Request,
  ): Promise<ValidateResponseDTO | void> {
    const result = await this.validateService.execute({
      refreshToken,
      user: req.user as User,
    });
    if (result) {
      const { user, token, refreshToken } = result;
      return {
        user: plainToInstance(User, user),
        token,
        refreshToken,
      };
    }
  }
}
