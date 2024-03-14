import { Test, TestingModule } from '@nestjs/testing';
import { GroupuserController } from './groupuser.controller';

describe('GroupuserController', () => {
  let controller: GroupuserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupuserController],
    }).compile();

    controller = module.get<GroupuserController>(GroupuserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
