import { IsDateString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateProcessingDto {
  @IsUUID()
  @IsNotEmpty()
  growingPeriodId: string;

  @IsUUID()
  @IsNotEmpty()
  machineId: string;

  @IsUUID()
  @IsNotEmpty()
  processingTypeId: string;

  @IsDateString()
  @IsNotEmpty()
  date: Date;
}
