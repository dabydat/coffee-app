import { CoffeeEntity } from 'src/coffees/entities/coffee.entity';
import { FlavorEntity } from 'src/coffees/entities/flavor.entity.ts';
import { CoffeeRefactor1744950703195 } from 'src/migrations/1744950703195-CoffeeRefactor';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '2510',
  database: 'iluvcoffee',
  entities: [
    CoffeeEntity,
    FlavorEntity,
  ],
  migrations: [
    CoffeeRefactor1744950703195,
  ],
});
