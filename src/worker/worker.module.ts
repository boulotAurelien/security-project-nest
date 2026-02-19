import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { BullModule } from '@nestjs/bullmq';
import { QUEUE_NAME } from 'src/constants/constant';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUE_NAME,
    }),
  ],
  providers: [WorkerService],
})
export class WorkerModule {}
