import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from 'src/coffees/coffees.controller';
import { CoffeesService } from 'src/coffees/coffees.service';
import { CoffeeEntity } from './entities/coffee.entity';
import { FlavorEntity } from './entities/flavor.entity.ts';
import { EventEntity } from 'src/events/entities/event.entity.ts/event.entity.ts';
import { COFFEE_BRANDS } from './coffees.constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([CoffeeEntity, FlavorEntity, EventEntity]),
  ],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    {
      provide: COFFEE_BRANDS,
      useValue: ['Buddy Brew', 'Blue Bottle', 'Drip'],
    },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
