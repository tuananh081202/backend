import { Test, TestingModule } from '@nestjs/testing';
import { EmployeetypeController } from './employeetype.controller';

describe('EmployeetypeController', () => {
  let controller: EmployeetypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeetypeController],
    }).compile();

    controller = module.get<EmployeetypeController>(EmployeetypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
