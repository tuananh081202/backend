import { Test, TestingModule } from '@nestjs/testing';
import { KyluatController } from './kyluat.controller';

describe('KyluatController', () => {
  let controller: KyluatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KyluatController],
    }).compile();

    controller = module.get<KyluatController>(KyluatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
