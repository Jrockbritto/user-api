import { Delete } from '@nestjs/common';
import { Controller, Param, UseGuards } from '@nestjs/common/decorators';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { USERS } from '@config/constants/tags.constants';

import { JwtAuthGuard } from '@modules/authentication/guards/jwtAuth.guard';
import { DisableUserDTO } from '@modules/users/dto/disableUser.dto';
import { User } from '@modules/users/entity/User.entity';

import { DisableUserService } from './disableUser.service';

@ApiBearerAuth()
@Controller(USERS.toLowerCase())
@ApiTags(USERS)
export class DisableUserController {
  constructor(private readonly disableUserService: DisableUserService) {}
  @Delete(':userId')
  @ApiOkResponse({ type: User })
  @UseGuards(JwtAuthGuard)
  async handler(@Param() { userId }: DisableUserDTO): Promise<{ user: User }> {
    const user = await this.disableUserService.execute({
      userId,
    });
    return { user: plainToInstance(User, user) };
  }
}
