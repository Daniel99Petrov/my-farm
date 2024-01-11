import { Module } from '@nestjs/common';
import { ProcessingTypesController } from './processing-types.controller';
import { ProcessingTypesService } from './processing-types.service';

@Module({
  controllers: [ProcessingTypesController],
  providers: [ProcessingTypesService]
})
export class ProcessingTypesModule {}
