import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { FlyEvent } from './fly-event';

@Injectable()
export class EventService {
  private readonly logger = new Logger(EventService.name);
  constructor(private readonly eventEmitter: EventEmitter2) {}

  sendEventOne() {
    this.logger.log('sendEventOne');
    this.eventEmitter.emit(
      'go-fly',
      new FlyEvent({ name: 'test one', speed: 50 }),
    );
  }

  sendEventTwo() {
    this.logger.log('sendEventTwo');
    this.eventEmitter.emit(
      'go-fly',
      new FlyEvent({ name: 'test two', speed: 10 }),
    );
  }

  @OnEvent('go-fly')
  handleFlyEvent(payload: FlyEvent) {
    this.logger.log('handle payload: ' + payload.name + ' : ' + payload.speed);
  }
}
