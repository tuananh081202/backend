import { Injectable } from '@nestjs/common';
import { Position } from './entities/position.entity';
import { CreatePositionDto } from './dto/create-position.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UpdatePositionDto } from './dto/update-position.dto';
import { FilterPositionDto } from './dto/filter-position.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PositionService {
    constructor(@InjectRepository(Position) private positionRepository: Repository<Position>){}


    async create(CreatePositionDto: CreatePositionDto):Promise<Position>{
        return await this.positionRepository.save(CreatePositionDto);
    }

    async findOne(id: number):Promise<Position>{
        return await this.positionRepository.findOneBy({id});
    }

    async delete(id:number):Promise<DeleteResult>{
        return await this.positionRepository.softDelete(id);

    }

    async updateCategory(id:number, UpdatePositionDto:UpdatePositionDto ):Promise<UpdateResult>{
        return await this.positionRepository.update(id,UpdatePositionDto);

    }

    async findAll(query: FilterPositionDto): Promise<any> {
      const items_per_page = Number(query.items_per_page) || 10;
      const page = Number(query.page) || 1;
      const skip = (page - 1) * items_per_page;
      let result = await this.positionRepository.createQueryBuilder('position');
      if (query.search) {
          const search = query.search;
          result.where('(position.maCV LIKE :search OR position.namePosition LIKE :search)', { search: `%${search}%` });
      }
      result.orderBy('created_at', 'DESC')
          .skip(skip)
          .take(items_per_page)
          .select([
              'position.id',
              'position.maCV',
              'position.namePosition',
              'position.degree',
              'position.salary',
              'position.description',
              'position.createdBy',
              'position.created_at',
              'position.updated_at'
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
