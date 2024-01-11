import { Test, TestingModule } from '@nestjs/testing';
import { ProcessingsService } from './processings.service';

describe('ProcessingsService', () => {
  let service: ProcessingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProcessingsService],
    }).compile();

    service = module.get<ProcessingsService>(ProcessingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
