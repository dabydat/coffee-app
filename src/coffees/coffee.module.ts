import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeEntity } from './entities/coffee.entity';
import { FlavorEntity } from './entities/flavor.entity.ts';
import { ConfigModule } from '@nestjs/config';
import coffeesConfig from './config/coffees.config';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { EventEntity } from '../events/entities/event.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CoffeeEntity, FlavorEntity, EventEntity]),
    ConfigModule.forFeature(coffeesConfig),
  ],
  controllers: [CoffeesController],
  providers: [CoffeesService],
  exports: [CoffeesService],
})
export class CoffeesModule {}
