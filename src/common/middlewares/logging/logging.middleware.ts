import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.time('Request duration'); // Inicia el temporizador
    console.log(`Request...`);
    res.on('finish', () => {
      console.timeEnd('Request duration'); // Finaliza el temporizador
    });
    next();
  }
}
