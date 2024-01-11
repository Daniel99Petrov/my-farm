import { Test, TestingModule } from '@nestjs/testing';
import { SoilsController } from './soils.controller';

describe('SoilsController', () => {
  let controller: SoilsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SoilsController],
    }).compile();

    controller = module.get<SoilsController>(SoilsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
