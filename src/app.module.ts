import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { FarmsModule } from './farms/farms.module';
import { FieldsModule } from './fields/fields.module';
import { MachinesModule } from './machines/machines.module';
import { SoilsModule } from './soils/soils.module';
import { CropsModule } from './crops/crops.module';
import { CultivationsModule } from './cultivations/cultivations.module';
import { ProcessingTypesModule } from './processing-types/processing-types.module';
import { ProcessingsModule } from './processings/processings.module';

@Module({
  imports: [
    UsersModule,
    FarmsModule,
    FieldsModule,
    MachinesModule,
    SoilsModule,
    CropsModule,
    CultivationsModule,
    ProcessingTypesModule,
    ProcessingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
