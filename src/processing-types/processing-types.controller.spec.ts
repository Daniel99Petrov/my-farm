import { Test, TestingModule } from '@nestjs/testing';
import { ProcessingTypesController } from './processing-types.controller';

describe('ProcessingTypesController', () => {
  let controller: ProcessingTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProcessingTypesController],
    }).compile();

    controller = module.get<ProcessingTypesController>(ProcessingTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
