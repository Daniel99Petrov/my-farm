import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateGrowingPeriodDto {
  @IsUUID()
  @IsNotEmpty()
  fieldId: string;

  @IsUUID()
  @IsNotEmpty()
  cropId: string;
}
