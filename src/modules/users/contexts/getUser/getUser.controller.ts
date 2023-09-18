import { Controller, Get, Param, UseGuards } from '@nestjs/common/decorators';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
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
  @Get(':userId')
  @ApiOkResponse({ type: User })
  @UseGuards(JwtAuthGuard)
  async handler(@Param() { userId }: GetUserDTO) {
    const user = await this.getUserService.execute({
      userId,
    });
    return { user: plainToInstance(User, user) };
  }
}
