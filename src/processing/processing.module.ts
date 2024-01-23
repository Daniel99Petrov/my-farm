import { Module } from '@nestjs/common';
import { ProcessingService } from './processing.service';
import { ProcessingController } from './processing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Processing } from './entities/processing.entity';
import { ProcessingTypeModule } from 'src/processing-type/processing-type.module';
import { GrowingPeriodModule } from 'src/growing-period/growing-period.module';
import { MachineModule } from 'src/machine/machine.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Processing]),
    ProcessingTypeModule,
    GrowingPeriodModule,
    MachineModule,
  ],
  controllers: [ProcessingController],
  providers: [ProcessingService],
  exports: [TypeOrmModule.forFeature([Processing]), ProcessingService],
})
export class ProcessingModule {}
