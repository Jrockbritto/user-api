import {
  Controller,
  Body,
  UseGuards,
  Param,
  Patch,
} from '@nestjs/common/decorators';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { USERS } from '@config/constants/tags.constants';

import { JwtAuthGuard } from '@modules/authentication/guards/jwtAuth.guard';
import {
  EditUserBodyDTO,
  EditUserParamsDTO,
} from '@modules/users/dto/editUser.dto';
import { User } from '@modules/users/entity/User.entity';

import { EditUserService } from './editUser.service';

@ApiBearerAuth()
@Controller(USERS.toLowerCase())
@ApiTags(USERS)
export class EditUserController {
  constructor(private readonly editUserService: EditUserService) {}
  @Patch(':userId')
  @ApiCreatedResponse({ type: User })
  @UseGuards(JwtAuthGuard)
  async handler(
    @Param() { userId }: EditUserParamsDTO,
    @Body() { data }: EditUserBodyDTO,
  ) {
    const user = await this.editUserService.execute({ userId, data });
    return { user: plainToInstance(User, user) };
  }
}
