import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

import { Match } from '@shared/decorators/matches.decorator';

export class CreateUserDTO {
  @ApiProperty({ type: String, example: 'lorem' })
  @IsString()
  name: string;

  @ApiProperty({ type: String, example: 'ipsum' })
  @IsString()
  lastName: string;

  @ApiProperty({ type: String, example: 'loremipsum@gmail.com' })
  @IsString()
  email: string;

  @ApiProperty({ type: String, example: 'Teste1234@' })
  @IsString()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiProperty({ type: String, example: 'Teste1234@' })
  @IsString()
  @Match('password')
  confirmPassword: string;
}
