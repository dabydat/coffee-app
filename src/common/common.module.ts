import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiKeyGuard } from './guards/api-key/api-key.guard';
import { LoggingMiddleware } from './middlewares/logging/logging.middleware';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: ApiKeyGuard,
    },
  ],
  exports: [],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
