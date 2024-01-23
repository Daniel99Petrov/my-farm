import { IsString, Length } from 'class-validator';
import { IsUnique } from 'src/unique/unique.decorator';

export class CreateCropDto {
  @IsString()
  @Length(1, 128)
  @IsUnique({ tableName: 'crop', column: 'name' })
  name: string;
}
