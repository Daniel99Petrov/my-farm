import { Test, TestingModule } from '@nestjs/testing';
import { CultivationsController } from './cultivations.controller';

describe('CultivationsController', () => {
  let controller: CultivationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CultivationsController],
    }).compile();

    controller = module.get<CultivationsController>(CultivationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
