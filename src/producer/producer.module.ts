import { Module } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { ProducerController } from './producer.controller';
import { BullModule } from '@nestjs/bullmq';
import { QUEUE_NAME } from 'src/constants/constant';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUE_NAME,
    }),
  ],
  providers: [ProducerService],
  controllers: [ProducerController],
})
export class ProducerModule {}
