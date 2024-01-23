import { Module } from '@nestjs/common';
import { SoilService } from './soil.service';
import { SoilController } from './soil.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Soil } from './entities/soil.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Soil])],
  controllers: [SoilController],
  providers: [SoilService],
  exports: [TypeOrmModule.forFeature([Soil]), SoilService],
})
export class SoilModule {}
