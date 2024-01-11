import { Test, TestingModule } from '@nestjs/testing';
import { ProcessingTypesService } from './processing-types.service';

describe('ProcessingTypesService', () => {
  let service: ProcessingTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProcessingTypesService],
    }).compile();

    service = module.get<ProcessingTypesService>(ProcessingTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
