import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateGrowingPeriodDto {
  @IsUUID()
  @IsNotEmpty()
  fieldId: string;

  @IsUUID()
  @IsNotEmpty()
  cropId: string;

  @IsUUID()
  @IsNotEmpty()
  machineId: string;

  @IsUUID()
  @IsNotEmpty()
  processingTypeId: string;

  @IsNotEmpty()
  date: Date;
}
