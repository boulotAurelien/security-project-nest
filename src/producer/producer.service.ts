import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { QUEUE_NAME } from 'src/constants/constant';

@Injectable()
export class ProducerService {
  constructor(
    @InjectQueue(QUEUE_NAME)
    private readonly queue: Queue,
  ) {}

  async sendFromProducerOne(data: string) {
    await this.queue.add('job-type', {
      producer: 'producer-one',
      message: data,
    });
  }

  async sendFromProducerTwo(data: string) {
    await this.queue.add('job-type', {
      producer: 'producer-two',
      message: data,
    });
  }
}
