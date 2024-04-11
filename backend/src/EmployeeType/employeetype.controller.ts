import { Body, Controller, Delete, Get, Param, Post, Put, Query, SetMetadata } from '@nestjs/common';
import { EmployeetypeService } from './employeetype.service';
import { FilterEmployeetypeDto } from './dto/filter-employeetype.dto';
import { CreateEmployeeTypeDto } from './dto/create-employeetype.dto';
import { EmployeeType } from './entities/employeetype.entity';
import { UpdateEmployeeTypeDto } from './dto/update-employeetype.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/Auth/decorator/roles.decorator';

@ApiTags('EmployeeType')
@Controller('employeetype')
export class EmployeetypeController {

    constructor(private readonly employeeTypeService: EmployeetypeService) { }
    
 
    @Get()
    async findAll(@Query() query: FilterEmployeetypeDto): Promise<any> {
        return await this.employeeTypeService.findAll(query)
    }

    
    @Post('create')
    async create(@Body() CreateEmployeeTypeDto: CreateEmployeeTypeDto): Promise<EmployeeType> {
        return await this.employeeTypeService.create(CreateEmployeeTypeDto)
    }

    @Put(':id')
    async updateEmployeeType(@Param('id') id: string, @Body() UpdateEmployeeTypeDto: UpdateEmployeeTypeDto) {
        return await this.employeeTypeService.update(Number(id), UpdateEmployeeTypeDto);
    }

    @Get(':id')

    async findOne(@Param('id') id: string): Promise<EmployeeType> {
        return await this.employeeTypeService.findOne(Number(id));

    }

    @Delete(':id')

    async deletePosition(@Param('id') id: string) {
        return await this.employeeTypeService.delete(Number(id));
    }

}

