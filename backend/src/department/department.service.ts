import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';

@Injectable()
export class DepartmentService {
    constructor(@InjectRepository(Department) private DepartmentRepository:Repository<Department>){}

    async create(createDepartmentDto:CreateDepartmentDto):Promise<Department>{
        return await this.DepartmentRepository.save(createDepartmentDto)
    }
}
