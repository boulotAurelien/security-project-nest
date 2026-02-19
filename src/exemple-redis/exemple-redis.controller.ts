import { Controller, Get, Param } from '@nestjs/common';
import { ExempleRedisService } from './exemple-redis.service';

@Controller('exemple-redis')
export class ExempleRedisController {
  constructor(private readonly exempleRedisService: ExempleRedisService) {}

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.exempleRedisService.getUser(id);
  }
}
