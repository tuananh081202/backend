import { Test, TestingModule } from '@nestjs/testing';
import { KyluatService } from './kyluat.service';

describe('KyluatService', () => {
  let service: KyluatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KyluatService],
    }).compile();

    service = module.get<KyluatService>(KyluatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
