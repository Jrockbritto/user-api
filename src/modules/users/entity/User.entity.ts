import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({
    example: '1f4ddf6f-2c11-4ba0-80cf-359d5bcd0711',
  })
  @IsString()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'John',
  })
  @IsString()
  @Column({ name: 'name' })
  name: string;

  @ApiProperty({
    example: 'Doe',
  })
  @IsString()
  @Column({ name: 'last_name' })
  lastName: string;

  @ApiProperty({
    example: 'email@email.com',
  })
  @IsString()
  @Column({ name: 'email' })
  email: string;

  @ApiHideProperty()
  @Column({ name: 'password' })
  @Exclude()
  password: string;

  @ApiProperty({ example: new Date() })
  @IsDate()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ example: new Date() })
  @IsDate()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ApiProperty({ example: null })
  @IsDate()
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
