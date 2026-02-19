import { InjectQueue, Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { Job, Queue } from 'bullmq';
import { QUEUE_NAME } from 'src/constants/constant';

export interface DemoJobPayload {
  producer: string;
  message: string;
}

@Injectable()
@Processor(QUEUE_NAME!)
export class WorkerService extends WorkerHost {
  private readonly logger = new Logger(WorkerService.name);

  constructor(@InjectQueue(QUEUE_NAME) private readonly queue: Queue) {
    super();
  }

  async process(job: Job<DemoJobPayload, any, string>): Promise<any> {
    this.logger.log(
      `Job received from ${job.data.producer} with message: ${job.data.message}`,
    );
    return Promise.resolve();
  }
}
