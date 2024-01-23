import { IsNotEmpty, IsString, Length } from 'class-validator';
import { IsUnique } from 'src/unique/unique.decorator';

export class CreateProcessingTypeDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 128)
  @IsUnique({ tableName: 'processing_type', column: 'name' })
  name: string;
}
