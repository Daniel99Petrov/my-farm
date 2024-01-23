import { Module } from '@nestjs/common';
import { ProcessingTypeService } from './processing-type.service';
import { ProcessingTypeController } from './processing-type.controller';
import { ProcessingType } from './entities/processing-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProcessingType])],
  controllers: [ProcessingTypeController],
  providers: [ProcessingTypeService],
  exports: [TypeOrmModule.forFeature([ProcessingType]), ProcessingTypeService],
})
export class ProcessingTypeModule {}
