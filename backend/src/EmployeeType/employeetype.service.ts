import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeType } from './entities/employeetype.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateEmployeeTypeDto } from './dto/create-employeetype.dto';
import { UpdateEmployeeTypeDto } from './dto/update-employeetype.dto';
import { FilterEmployeetypeDto } from './dto/filter-employeetype.dto';

@Injectable()
export class EmployeetypeService {
    constructor(@InjectRepository(EmployeeType) private employeeTypeRepository: Repository<EmployeeType>){}


    async create(CreateEmployeeTypeDto: CreateEmployeeTypeDto):Promise<EmployeeType>{
        return await this.employeeTypeRepository.save(CreateEmployeeTypeDto);
    }

    async findOne(id: number):Promise<EmployeeType>{
        return await this.employeeTypeRepository.findOneBy({id});
    }

    async delete(id:number):Promise<DeleteResult>{
        return await this.employeeTypeRepository.softDelete(id);

    }

    async update(id:number, UpdateEmployeeTypeDto:UpdateEmployeeTypeDto ):Promise<UpdateResult>{
        return await this.employeeTypeRepository.update(id,UpdateEmployeeTypeDto);

    }

    async findAll(query: FilterEmployeetypeDto): Promise<any> {
      const items_per_page = Number(query.items_per_page) || 10;
      const page = Number(query.page) || 1;
      const skip = (page - 1) * items_per_page;
      let result = await this.employeeTypeRepository.createQueryBuilder('employeetype');
      if (query.search) {
          const search = query.search;
          result.where('(employeetype.MaLoai LIKE :search OR employeetype.LoaiNV LIKE :search)', { search: `%${search}%` });
      }
      result.orderBy('created_at', 'DESC')
          .skip(skip)
          .take(items_per_page)
          .select([
              'employeetype.id',
              'employeetype.MaLoai',
              'employeetype.LoaiNV',
              'employeetype.description',
              'employeetype.createdBy',
              'employeetype.created_at',
              'employeetype.updated_at'
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
