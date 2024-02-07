import { Module } from '@nestjs/common';
import { GrowingPeriodService } from './growing-period.service';
import { GrowingPeriodController } from './growing-period.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrowingPeriod } from './entities/growing-period.entity';
import { CropModule } from 'src/crop/crop.module';
import { FieldModule } from 'src/field/field.module';
import { ProcessingModule } from 'src/processing/processing.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GrowingPeriod]),
    FieldModule,
    CropModule,
    ProcessingModule,
  ],
  controllers: [GrowingPeriodController],
  providers: [GrowingPeriodService],
  exports: [TypeOrmModule.forFeature([GrowingPeriod]), GrowingPeriodService],
})
export class GrowingPeriodModule {}
