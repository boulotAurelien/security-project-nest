import { Controller, Post, Body } from '@nestjs/common';
import { ProducerService } from './producer.service';

@Controller('jobs')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Post('producer-one')
  async producerOne(@Body('message') message: string) {
    await this.producerService.sendFromProducerOne(message);
    return { status: 'sent from producer one' };
  }

  @Post('producer-two')
  async producerTwo(@Body('message') message: string) {
    await this.producerService.sendFromProducerTwo(message);
    return { status: 'sent from producer two' };
  }
}
