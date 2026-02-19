import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Keyv from 'keyv';
import KeyvRedis from '@keyv/redis';
import { CacheableMemory } from '@cacheable/memory';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: 60_000,
        stores: [
          new Keyv({
            store: new CacheableMemory({ ttl: 60_000, lruSize: 5000 }),
          }),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          new Keyv(new KeyvRedis(config.get<string>('REDIS_URL'))),
        ],
      }),
    }),
  ],
})
export class RedisModule {}
