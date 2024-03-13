import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { FilterDepartmentDto } from './dto/filter-department.dto';

@Injectable()
export class DepartmentService {
    constructor(@InjectRepository(Department) private DepartmentRepository: Repository<Department>) { }

    async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
        return await this.DepartmentRepository.save(createDepartmentDto)
    }

    async findOne(id: number): Promise<Department> {
        return await this.DepartmentRepository.findOneBy({ id });
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.DepartmentRepository.softDelete(id);

    }

    async update(id: number, UpdateDepartmentDto: UpdateDepartmentDto): Promise<UpdateResult> {
        return await this.DepartmentRepository.update(id, UpdateDepartmentDto);

    }

    async findAll(query: FilterDepartmentDto): Promise<any> {
        const items_per_page = Number(query.items_per_page) || 10;
        const page = Number(query.page) || 1;
        const skip = (page - 1) * items_per_page;
        let result = await this.DepartmentRepository.createQueryBuilder('department');
        if (query.search) {
            const search = query.search;
            result.where('(department.maPB LIKE :search OR department.tenPB LIKE :search)', { search: `%${search}%` });
        }
        result.orderBy('created_at', 'DESC')
            .skip(skip)
            .take(items_per_page)
            .select([
                'department.id',
                'department.maPB',
                'department.tenPB',
                'department.description',
                'department.createdBy',
                'department.created_at',
                'department.updated_at'
            ])
        const [res, total] = await result.getManyAndCount();
        const lastPage = Math.ceil(total / items_per_page);
        const nextPage = page + 1 > lastPage ? null : page + 1;
        const prevPage = page - 1 < 1 ? null : page - 1
        return {
            data: res,
            total,
            items_per_page,
            currentPage: page,
            nextPage,
            prevPage,
            lastPage
        };
    }


}
