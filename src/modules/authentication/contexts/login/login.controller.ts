import { Body, Controller, Post } from '@nestjs/common/decorators';
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
  async handler(@Body() dto: LoginRequestDTO): Promise<LoginResponseDTO> {
    const { user, token, refreshToken } = await this.loginService.execute(dto);
    return {
      user: plainToInstance(User, user),
      token,
      refreshToken,
    };
  }
}
