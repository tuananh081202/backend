import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PositionService } from './position.service';
import { FilterPositionDto } from './dto/filter-position.dto';
import { CreatePositionDto } from './dto/create-position.dto';
import { Position } from './entities/position.entity';
import { UpdatePositionDto } from './dto/update-position.dto';

@ApiTags('Position')
@Controller('position')
export class PositionController {
    constructor(private readonly positionService: PositionService) { }

    @Get()
    async findAll(@Query() query: FilterPositionDto): Promise<any> {
        return await this.positionService.findAll(query)
    }


    @Post('create')
    async create(@Body() CreatePositionDto: CreatePositionDto): Promise<Position> {
        return await this.positionService.create(CreatePositionDto)
    }

    @Put(':id')
    async updateCategory(@Param('id') id: string, @Body() UpdatePositionDto: UpdatePositionDto) {
        return await this.positionService.updateCategory(Number(id), UpdatePositionDto);
    }

    @Get(':id')

    async findOne(@Param('id') id: string): Promise<Position> {
        return await this.positionService.findOne(Number(id));

    }

    @Delete(':id')

    async deletePosition(@Param('id') id: string) {
        return await this.positionService.delete(Number(id));
    }


}
