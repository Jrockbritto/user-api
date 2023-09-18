import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditUserDataDTO {
  @ApiProperty({ type: String, example: 'johndoe' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  username: string;

  @ApiProperty({ type: String, example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  fullName: string;
}
