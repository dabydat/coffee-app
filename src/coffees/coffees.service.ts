import { Injectable, NotFoundException } from '@nestjs/common';
import { CoffeeEntity } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { FlavorEntity } from './entities/flavor.entity.ts';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { EventEntity } from '../events/entities/event.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(CoffeeEntity)
    private readonly coffeeRepository: Repository<CoffeeEntity>,
    @InjectRepository(FlavorEntity)
    private readonly flavorRepository: Repository<FlavorEntity>,
    private readonly dataSource: DataSource,
  ) {
  }

  async findAll(paginationQuery: PaginationQueryDto): Promise<CoffeeEntity[]> {
    const { limit, offset } = paginationQuery;
    return await this.coffeeRepository.find({
      take: limit,
      skip: offset,
      relations: { flavors: true },
    });
  }

  async findOne(id: string): Promise<CoffeeEntity> {
    const coffee: CoffeeEntity | null = await this.coffeeRepository.findOne({
      where: { id: +id },
      relations: { flavors: true },
    });
    if (!coffee) throw new NotFoundException(`Coffee with id ${id} not found`);
    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto): Promise<CoffeeEntity> {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((name) => this.preloadFlavor(name)),
    );

    const coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors,
    });

    return await this.coffeeRepository.save(coffee);
  }

  async update(
    id: string,
    updateCoffeeDto: UpdateCoffeeDto,
  ): Promise<CoffeeEntity> {
    const flavors =
      updateCoffeeDto.flavors &&
      (await Promise.all(
        updateCoffeeDto.flavors.map((name) => this.preloadFlavor(name)),
      ));

    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavors,
    });

    if (!coffee) throw new NotFoundException(`Coffee with id ${id} not found`);
    return await this.coffeeRepository.save(coffee);
  }

  async remove(id: string): Promise<void> {
    const coffee = await this.findOne(id);
    await this.coffeeRepository.remove(coffee);
  }

  private async preloadFlavor(name: string): Promise<FlavorEntity> {
    const existingFlavor = await this.flavorRepository.findOneBy({ name });
    if (existingFlavor) return existingFlavor;
    return this.flavorRepository.create({ name });
  }

  async recommendCoffee(coffee: CoffeeEntity) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      coffee.recommendations++;
      const recommendEvent = new EventEntity();
      recommendEvent.name = 'recommend_coffee';
      recommendEvent.type = 'coffee';
      recommendEvent.payload = { coffeeId: coffee.id };
      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recommendEvent);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      console.error('Transaction failed:', err);
      throw err;
    } finally {
      await queryRunner.release();
    }
    return coffee;
  }
}
