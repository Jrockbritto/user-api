import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

import { User } from '@modules/users/entity/User.entity';

export class LoginRequestDTO {
  @ApiProperty({ type: String, example: 'johndoe@gmail.com' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, example: 'Teste1234@' })
  @IsString()
  password: string;
}

export class LoginResponseDTO {
  @ApiProperty({
    type: User,
    example: {
      id: '8a580c52-e012-45a7-965a-0c8bf6a85ced',
      name: 'John',
      lastName: 'Doe',
      email: 'johndoe@gmail.com',
      createdAt: '2023-04-26T20:43:51.671Z',
      updatedAt: '2023-04-26T20:43:51.671Z',
      deletedAt: null,
    },
  })
  user: User;

  @ApiProperty({
    type: String,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODI1MzE1NDUsImV4cCI6MTY4MjYxNzk0NSwic3ViIjoiOGE1ODBjNTItZTAxMi00NWE3LTk2NWEtMGM4YmY2YTg1Y2VkIn0.nVnXUeEvl_e8XS7OnEJZLDWPGE0QplwBTqtGAXLAOJA',
  })
  @IsString()
  token: string;
}
