import { Test, TestingModule } from '@nestjs/testing';
import { GroupuserService } from './groupuser.service';

describe('GroupuserService', () => {
  let service: GroupuserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupuserService],
    }).compile();

    service = module.get<GroupuserService>(GroupuserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
