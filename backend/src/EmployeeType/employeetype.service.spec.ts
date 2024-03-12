import { Test, TestingModule } from '@nestjs/testing';
import { EmployeetypeService } from './employeetype.service';

describe('EmployeetypeService', () => {
  let service: EmployeetypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeetypeService],
    }).compile();

    service = module.get<EmployeetypeService>(EmployeetypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
