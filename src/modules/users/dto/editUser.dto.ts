import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmptyObject,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

import { EditUserDataDTO } from './editUserData.dto';

export class EditUserParamsDTO {
  @ApiProperty({})
  @IsUUID()
  @IsString()
  userId: string;
}

export class EditUserBodyDTO {
  @ApiProperty({
    type: EditUserDataDTO,
    example: {
      username: 'loremipsum',
      fullName: 'Lorem Ipsom',
    },
  })
  @Type(() => EditUserDataDTO)
  @ValidateNested()
  @IsNotEmptyObject()
  data: EditUserDataDTO;
}

export class EditUserDTO {
  userId: string;
  data: EditUserDataDTO;
}
