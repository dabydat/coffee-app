import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
  private readonly coffees: Coffee[] = [
    {
      id: 1,
      name: 'Arabica',
      brand: 'Starbucks',
      flavors: ['chocolate', 'vanilla'],
    },
    {
      id: 2,
      name: 'Robusta',
      brand: 'Nescafe',
      flavors: ['spicy', 'citrus'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string): Coffee {
    const coffee: Coffee | undefined = this.coffees.find(
      (item) => item.id === +id,
    );
    if (!coffee) throw new NotFoundException(`Coffee with id ${id} not found`);
    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    const coffee: Coffee = {
      id: this.coffees.length + 1,
      ...createCoffeeDto,
    };
    this.coffees.push(coffee);
  }

  update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      // Object.assign(existingCoffee, updateCoffeeDto);
    }
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex((item) => item.id === +id);
    if (coffeeIndex > -1) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
