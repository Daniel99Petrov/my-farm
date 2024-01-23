import { IsNotEmpty, IsString, Length } from 'class-validator';
import { IsUnique } from 'src/unique/unique.decorator';

export class CreateSoilDto {
  @IsString()
  @IsNotEmpty()
  @IsUnique({ tableName: 'soil', column: 'name' })
  @Length(1, 128)
  name: string;
}
