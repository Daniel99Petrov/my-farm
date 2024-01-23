import { Type } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsObject,
  IsString,
  IsUUID,
  Length,
  ValidateNested,
} from 'class-validator';
import { IsUnique } from 'src/unique/unique.decorator';

export class CoordinatesDto {
  @IsNotEmpty()
  @IsIn(['Polygon', 'MultiPolygon'])
  type: string;

  @IsNotEmpty()
  coordinates: number[][][] | number[][][][];
}

export class CreateFieldDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 128)
  @IsUnique({ tableName: 'field', column: 'name' })
  name: string;

  @IsObject()
  @ValidateNested()
  @Type(() => CoordinatesDto)
  borders: CoordinatesDto;

  @IsUUID()
  @IsNotEmpty()
  farmId: string;

  @IsUUID()
  @IsNotEmpty()
  soilId: string;
}
