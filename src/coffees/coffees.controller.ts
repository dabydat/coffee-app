import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Public } from '../common/decorators/public.decorator';
import { Protocol } from '../common/decorators/protocol.decorator';

@ApiTags('Coffees')
@Controller('coffees')
export class CoffeesController {
    constructor(
        private readonly coffeesService: CoffeesService, 
    ) {}

    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @Public()
    @Get()
    async findAll(@Protocol() protocol: string, @Query() paginationQuery: PaginationQueryDto){
        return this.coffeesService.findAll(paginationQuery);
    }
    @Public()
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: string){
        return this.coffeesService.findOne(id);
    }
    @Public()
    @Post()
    create(@Body() body: CreateCoffeeDto) {
        return this.coffeesService.create(body);
    }
    @Public()
    @Patch(':id')
    update(@Param('id') id: string, @Body() body: UpdateCoffeeDto) {
        return this.coffeesService.update(id, body);
    }
    @Public()
    @Delete(':id')
    remove(@Param('id') id: string){
        return this.coffeesService.remove(id);
    }
}
