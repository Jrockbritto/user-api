import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { User } from '../entity/User.entity';

export class CreateUserResponseDTO {
  @ApiProperty({
    type: User,
    example: {
      name: 'Lorem',
      lastName: 'Ipsom',
      email: 'loremipsom@gmail.com',
      deletedAt: null,
      id: '530b4225-e2e5-41e7-ba0f-c7c6d42e5540',
      createdAt: '2023-08-09T14:53:09.494Z',
      updatedAt: '2023-08-09T14:53:09.494Z',
    },
  })
  @ValidateNested()
  @Type(() => User)
  user: User;
}
