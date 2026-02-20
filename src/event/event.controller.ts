import { Controller, Get } from '@nestjs/common';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get('one')
  callEventProducerOne() {
    this.eventService.sendEventOne();
  }

  @Get('two')
  callEventProducerTwo() {
    this.eventService.sendEventTwo();
  }
}
