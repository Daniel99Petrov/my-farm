import { Module } from '@nestjs/common';
import { ProcessingService } from './processing.service';
import { ProcessingController } from './processing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Processing } from './entities/processing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Processing])],
  controllers: [ProcessingController],
  providers: [ProcessingService],
  exports: [TypeOrmModule.forFeature([Processing]), ProcessingService],
})
export class ProcessingModule {}
