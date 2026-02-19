import { Injectable } from '@nestjs/common';
import { CacheService } from './redis.service';

export interface User {
  id: string;
  name: string;
  createdAt: Date;
}

@Injectable()
export class ExempleRedisService {
  constructor(private readonly cacheService: CacheService) {}

  async getUser(id: string): Promise<User> {
    const key = `user:${id}`;

    const cached = await this.cacheService.get<User>(key);
    if (cached) {
      console.log('From cache');
      return cached;
    }

    console.log('From NO cache');

    // Simu
    const user: User = {
      id,
      name: 'John Doe',
      createdAt: new Date(),
    };

    await this.cacheService.set(key, user, 300_000);

    return user;
  }
}
