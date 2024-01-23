import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { ConfigModule } from '@nestjs/config';
import { CropModule } from './crop/crop.module';
import { FarmModule } from './farm/farm.module';
import { FieldModule } from './field/field.module';
import { GrowingPeriodModule } from './growing-period/growing-period.module';
import { MachineModule } from './machine/machine.module';
import { ProcessingTypeModule } from './processing-type/processing-type.module';
import { ProcessingModule } from './processing/processing.module';
import { SoilModule } from './soil/soil.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
// import { ReportModule } from './report/report.module';
import { IsUniqueConstraint } from './unique/validator';
import { UniqueModule } from './unique/unique.module';
import { GlobalExceptionFilter } from 'HttpExceptionFilter';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ConfigModule.forRoot(),
    CropModule,
    FarmModule,
    FieldModule,
    GrowingPeriodModule,
    MachineModule,
    ProcessingTypeModule,
    ProcessingModule,
    SoilModule,
    UserModule,
    AuthModule,
    // ReportModule,
    UniqueModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    IsUniqueConstraint,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
