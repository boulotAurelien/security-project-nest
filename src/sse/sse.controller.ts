import { Controller, Get, Res, Sse } from '@nestjs/common';
import { interval, map, Observable } from 'rxjs';
import * as express from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';

@Controller('sse')
export class SseController {
  @Get()
  index(@Res() response: express.Response) {
    response
      .type('text/html')
      .send(readFileSync(join(__dirname, 'sse.html')).toString());
  }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(
      map(() => ({ data: { hello: 'world' } }) as MessageEvent),
    );
  }
}
