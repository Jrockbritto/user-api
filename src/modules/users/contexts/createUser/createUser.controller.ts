import { Body, Controller, Post, UseGuards } from '@nestjs/common/decorators';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { USERS } from '@config/constants/tags.constants';

import { JwtAuthGuard } from '@modules/authentication/guards/jwtAuth.guard';
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
  @UseGuards(JwtAuthGuard)
  async handler(
    @Body() { email, lastName, name, password, confirmPassword }: CreateUserDTO,
  ) {
    const user = await this.createUserService.execute({
      email,
      lastName,
      name,
      password,
      confirmPassword,
    });
    return { user: plainToInstance(User, user) };
  }
}
