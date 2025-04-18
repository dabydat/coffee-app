import { Module } from '@nestjs/common';
import { CoffeeRatingService } from './coffee-rating.service';
import { CoffeesModule } from 'src/coffees/coffee.module';

@Module({
  imports: [
    CoffeesModule,
  ],
  providers: [CoffeeRatingService]
})
export class CoffeeRatingModule {}
