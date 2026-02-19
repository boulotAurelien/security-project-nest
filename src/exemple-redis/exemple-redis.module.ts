import { Module } from '@nestjs/common';
import { RedisModule } from '../redis/redis.module';
import { CacheService } from './redis.service';
import { ExempleRedisController } from './exemple-redis.controller';
import { ExempleRedisService } from './exemple-redis.service';

@Module({
  imports: [RedisModule],
  providers: [CacheService, ExempleRedisService],
  controllers: [ExempleRedisController],
})
export class ExempleRedisModule {}
