import { Controller, Get } from '@nestjs/common';
import { FarmService } from 'src/farm/farm.service';
import { EntityManager } from 'typeorm';

@Controller('report')
export class ReportController {
  constructor(
    private readonly farmService: FarmService,
    private readonly entityManager: EntityManager,
  ) {}

  @Get('/farm-with-most-machines')
  async findFarmWithMostMachines() {
    return await this.farmService.findFarmWithMostMachines(this.entityManager);
  }
  @Get('/most-common-soil-in-farm')
  async findMostCommonSoilInFarm() {
    return await this.farmService.findMostCommonSoilInFarm();
  }
  @Get('/field-count-per-farm-and-crop')
  async findCountOfFieldsPerFarmAndCrop() {
    return await this.farmService.findCountOfFieldsPerFarmAndCrop();
  }
}
