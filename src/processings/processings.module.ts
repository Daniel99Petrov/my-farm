import { Module } from '@nestjs/common';
import { ProcessingsController } from './processings.controller';
import { ProcessingsService } from './processings.service';

@Module({
  controllers: [ProcessingsController],
  providers: [ProcessingsService]
})
export class ProcessingsModule {}
