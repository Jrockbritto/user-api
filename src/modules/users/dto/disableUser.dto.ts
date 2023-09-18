import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class DisableUserDTO {
  @ApiProperty({
    type: String,
    example: 'f6488c82-c9c2-42b9-8677-70daf8ce7897',
  })
  @IsString()
  @IsUUID()
  userId: string;
}
