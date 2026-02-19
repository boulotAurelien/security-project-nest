import { Test, TestingModule } from '@nestjs/testing';
import { ExempleRedisController } from './exemple-redis.controller';

describe('ExempleRedisController', () => {
  let controller: ExempleRedisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExempleRedisController],
    }).compile();

    controller = module.get<ExempleRedisController>(ExempleRedisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
