import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LogoutRequestDTO {
  @ApiProperty({
    type: String,
    example: '99c33853-349a-4727-862a-31186b8938a9',
  })
  @IsString()
  userId: string;
}
