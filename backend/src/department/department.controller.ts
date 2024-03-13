import { Body,Get, Controller, Delete, Post, Query, Param, Put } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { Department } from './entities/department.entity';
import { ApiTags } from '@nestjs/swagger';
import { query } from 'express';
import { FilterDepartmentDto } from './dto/filter-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@ApiTags('department')
@Controller('department')
export class DepartmentController {
    constructor (private departmentService:DepartmentService){}

    @Post('create')
    async create(@Body() createDepartmentDto:CreateDepartmentDto):Promise<Department>{
        return await this.departmentService.create(createDepartmentDto)
    }

    @Get('')
    async findAll(@Query() query:FilterDepartmentDto):Promise<any>{
        return await this.departmentService.findAll(query)
    }

    @Get(':id')
    async findOne(@Param('id') id:string):Promise<Department>{
        return await this.departmentService.findOne(Number(id))
    }

    @Put(':id')
    async updateDepartment(@Param('id') id:string,@Body() UpdateDepartmentDto:UpdateDepartmentDto){
        return await this.departmentService.update(Number(id),UpdateDepartmentDto)
    }

    @Delete(':id')
    async deleteDepartment(@Param('id') id:string) {
        return await this.departmentService.delete(Number(id))
    }
}
