import { Test, TestingModule } from '@nestjs/testing';
import { UsertrackloginController } from './usertracklogin.controller';

describe('UsertrackloginController', () => {
  let controller: UsertrackloginController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsertrackloginController],
    }).compile();

    controller = module.get<UsertrackloginController>(UsertrackloginController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
