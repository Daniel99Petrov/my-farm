import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { FarmService } from 'src/farm/farm.service';
import { FarmModule } from 'src/farm/farm.module';

@Module({
  imports: [FarmModule],
  controllers: [ReportController],
  providers: [FarmService],
})
export class ReportModule {}
