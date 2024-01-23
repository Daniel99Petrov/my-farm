import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  @Length(1, 64)
  username: string;

  @IsString()
  @IsOptional()
  password: string;
}
