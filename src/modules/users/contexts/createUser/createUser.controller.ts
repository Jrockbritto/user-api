import { Body, Controller, Post } from '@nestjs/common/decorators';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { USERS } from '@config/constants/tags.constants';

import { CreateUserDTO } from '@modules/users/dto/createUser.dto';
import { CreateUserResponseDTO } from '@modules/users/dto/createUserResponse.dto';
import { User } from '@modules/users/entity/User.entity';

import { CreateUserService } from './createUser.service';

@ApiBearerAuth()
@Controller(USERS.toLowerCase())
@ApiTags(USERS)
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}
  @Post()
  @ApiCreatedResponse({ type: CreateUserResponseDTO })
  async handler(
    @Body()
    {
      email,
      fullName,
      biography,
      username,
      password,
      confirmPassword,
    }: CreateUserDTO,
  ): Promise<{ user: User }> {
    const user = await this.createUserService.execute({
      email,
      fullName,
      biography,
      username,
      password,
      confirmPassword,
    });
    return { user: plainToInstance(User, user) };
  }
}
