import { Test, TestingModule } from '@nestjs/testing';
import { ExempleRedisService } from './exemple-redis.service';

describe('ExempleRedisService', () => {
  let service: ExempleRedisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExempleRedisService],
    }).compile();

    service = module.get<ExempleRedisService>(ExempleRedisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
