import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { IsUnique } from 'src/unique/unique.decorator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @IsUnique({ tableName: 'user', column: 'email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 64)
  @IsUnique({ tableName: 'user', column: 'username' })
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
