import { Module } from '@nestjs/common';
import { CultivationsController } from './cultivations.controller';
import { CultivationsService } from './cultivations.service';

@Module({
  controllers: [CultivationsController],
  providers: [CultivationsService]
})
export class CultivationsModule {}
