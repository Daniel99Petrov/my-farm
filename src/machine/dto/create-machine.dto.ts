import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';
import { IsUnique } from 'src/unique/unique.decorator';

export class CreateMachineDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 128)
  brand: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 128)
  model: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 64)
  @IsUnique({ tableName: 'machine', column: 'registrationNumber' })
  registrationNumber: string;

  @IsUUID()
  @IsNotEmpty()
  farmId: string;
}
