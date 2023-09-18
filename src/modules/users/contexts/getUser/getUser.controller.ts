import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { USERS } from '@config/constants/tags.constants';

import { JwtAuthGuard } from '@modules/authentication/guards/jwtAuth.guard';
import { GetUserDTO } from '@modules/users/dto/getUser.dto';
import { User } from '@modules/users/entity/User.entity';

import { GetUserService } from './getUser.service';

@ApiBearerAuth()
@Controller(USERS.toLowerCase())
@ApiTags(USERS)
export class GetUserController {
  constructor(private readonly getUserService: GetUserService) {}
  @Post(':userId')
  @ApiCreatedResponse({ type: User })
  @UseGuards(JwtAuthGuard)
  async handler(@Param() { id }: GetUserDTO) {
    const user = await this.getUserService.execute({
      id,
    });
    return { user: plainToInstance(User, user) };
  }
}
