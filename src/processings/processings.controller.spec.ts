import { Test, TestingModule } from '@nestjs/testing';
import { ProcessingsController } from './processings.controller';

describe('ProcessingsController', () => {
  let controller: ProcessingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProcessingsController],
    }).compile();

    controller = module.get<ProcessingsController>(ProcessingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
