import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { User } from '@modules/users/entity/User.entity';

export class ValidateRequestDTO {
  @ApiPropertyOptional({
    type: String,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  @IsString()
  @IsOptional()
  refreshToken?: string;
}

export class ValidateDTO extends ValidateRequestDTO {
  @ApiProperty({
    type: String,
    example: '8a580c52-e012-45a7-965a-0c8bf6a85ced',
  })
  @IsString()
  user: User;
}

export class ValidateResponseDTO {
  @ApiProperty({
    type: User,
    example: {
      id: '8a580c52-e012-45a7-965a-0c8bf6a85ced',
      username: 'johndoe',
      fullName: 'John Doe',
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

  @ApiProperty({
    type: String,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODI1MzE1NDUsImV4cCI6MTY4MjYxNzk0NSwic3ViIjoiOGE1ODBjNTItZTAxMi00NWE3LTk2NWEtMGM4YmY2YTg1Y2VkIn0.nVnXUeEvl_e8XS7OnEJZLDWPGE0QplwBTqtGAXLAOJA',
  })
  @IsString()
  refreshToken: string;
}
