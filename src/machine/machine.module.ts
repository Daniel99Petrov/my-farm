import { Module } from '@nestjs/common';
import { MachineService } from './machine.service';
import { MachineController } from './machine.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Machine } from './entities/machine.entity';
import { FarmModule } from 'src/farm/farm.module';
import { ProcessingModule } from 'src/processing/processing.module';

@Module({
  imports: [TypeOrmModule.forFeature([Machine]), FarmModule, ProcessingModule],
  controllers: [MachineController],
  providers: [MachineService],
  exports: [TypeOrmModule.forFeature([Machine]), MachineService],
})
export class MachineModule {}
