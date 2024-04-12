import { Test, TestingModule } from '@nestjs/testing';
import { UsertrackloginService } from './usertracklogin.service';

describe('UsertrackloginService', () => {
  let service: UsertrackloginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsertrackloginService],
    }).compile();

    service = module.get<UsertrackloginService>(UsertrackloginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
