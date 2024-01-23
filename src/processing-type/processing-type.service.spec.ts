import { Test, TestingModule } from '@nestjs/testing';
import { ProcessingTypeService } from './processing-type.service';

describe('ProcessingTypeService', () => {
  let service: ProcessingTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProcessingTypeService],
    }).compile();

    service = module.get<ProcessingTypeService>(ProcessingTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
