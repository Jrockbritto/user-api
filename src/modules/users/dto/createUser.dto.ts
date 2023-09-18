import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

import { Match } from '@shared/decorators/matches.decorator';

export class CreateUserDTO {
  @ApiProperty({ type: String, example: 'loremipsum' })
  @IsString()
  username: string;

  @ApiProperty({ type: String, example: 'Lorem Ipsum' })
  @IsString()
  fullName: string;

  @ApiProperty({ type: String, example: 'Lorem Ipsum was a very nice person.' })
  @IsString()
  biography: string;

  @ApiProperty({ type: String, example: 'loremipsum@gmail.com' })
  @IsString()
  email: string;

  @ApiProperty({ type: String, example: 'Teste1234@' })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*[a-z])/, {
    message: 'password must have at least one lowcase letter',
  })
  @Matches(/^(?=.*[0-9])/, {
    message: 'password must have at least one digit',
  })
  @Matches(/^(?=.*[!@#$&*])/, {
    message: 'password must have at least one special character',
  })
  @Matches(/^(?=.*[A-Z])/, {
    message: 'password must have at least one uppercase letter',
  })
  password: string;

  @ApiProperty({ type: String, example: 'Teste1234@' })
  @IsString()
  @Match('password')
  confirmPassword: string;
}
