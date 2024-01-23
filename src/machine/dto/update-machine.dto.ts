import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateMachineDto } from './create-machine.dto';

export class UpdateMachineDto extends PartialType(
  OmitType(CreateMachineDto, ['farmId', 'model', 'brand'] as const),
) {}
