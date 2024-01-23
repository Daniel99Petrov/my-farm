import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { IsUnique } from 'src/unique/unique.decorator';
export class CreateFarmDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 128)
  @IsUnique({ tableName: 'farm', column: 'name' })
  name: string;

  @IsNotEmpty()
  @IsLatitude()
  latitude: string;

  @IsNotEmpty()
  @IsLongitude()
  longitude: string;
}
