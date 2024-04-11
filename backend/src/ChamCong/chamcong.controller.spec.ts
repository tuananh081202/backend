import { Test, TestingModule } from '@nestjs/testing';
import { ChamcongController } from './chamcong.controller';

describe('ChamcongController', () => {
  let controller: ChamcongController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChamcongController],
    }).compile();

    controller = module.get<ChamcongController>(ChamcongController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
