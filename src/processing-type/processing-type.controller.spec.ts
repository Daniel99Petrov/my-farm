import { Test, TestingModule } from '@nestjs/testing';
import { ProcessingTypeController } from './processing-type.controller';
import { ProcessingTypeService } from './processing-type.service';

describe('ProcessingTypeController', () => {
  let controller: ProcessingTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProcessingTypeController],
      providers: [ProcessingTypeService],
    }).compile();

    controller = module.get<ProcessingTypeController>(ProcessingTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
