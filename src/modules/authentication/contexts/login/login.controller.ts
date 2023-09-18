import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { AUTHENTICATION } from '@config/constants/tags.constants';

import {
  LoginRequestDTO,
  LoginResponseDTO,
} from '@modules/authentication/dto/login.dto';
import { User } from '@modules/users/entity/User.entity';

import { LoginService } from './login.service';

@ApiTags(AUTHENTICATION)
@Controller(AUTHENTICATION.toLowerCase())
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @ApiCreatedResponse({ type: LoginResponseDTO })
  @Post('/login')
  async handler(@Body() dto: LoginRequestDTO) {
    const { user, token } = await this.loginService.execute(dto);
    return {
      user: plainToInstance(User, user),
      token,
    };
  }
}
