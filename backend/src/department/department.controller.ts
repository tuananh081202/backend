import { Body, Controller, Post } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { Department } from './entities/department.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('department')
@Controller('department')
export class DepartmentController {
    constructor (private departmentService:DepartmentService){}

    @Post('create')
    async create(@Body() createDepartmentDto:CreateDepartmentDto):Promise<Department>{
        return await this.departmentService.create(createDepartmentDto)
    }
}
