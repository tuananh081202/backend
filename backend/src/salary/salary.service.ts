import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { Salary } from './entities/salary.entity';
import { CreateSalaryDto } from './dto/create-salary.dto';
import { FilterSalaryDto } from './dto/filter-salary.dto';
import { UpdateSalaryDto } from './dto/update-salary.dto';

@Injectable()
export class SalaryService {
    constructor(
    @InjectRepository(Salary)
    private salaryRepository: Repository<Salary>,
   
     ) { }

    async create(CreateSalaryDto: CreateSalaryDto): Promise<Salary> {
        return await this.salaryRepository.save(CreateSalaryDto)
    }

    async findAll(query: FilterSalaryDto): Promise<any> {
        const items_per_page = Number(query.items_per_page) || 10
        const page = Number(query.page) || 1
        const skip = (page - 1) * items_per_page;
        let result = this.salaryRepository.createQueryBuilder('salary')
        if (query.search) {
            const search = query.search
            result
                .where('(salary.MaLuong LIKE :search OR salary.ThucLanh LIKE :search )', { search: `%${search}` })
        }
        if (query.position) {
            const positionId = Number(query.position)
            result.where('salary.position =:positionId', { positionId })
        }
        if (query.user) {
            const userId = Number(query.user)
            result.where('posts.user =:userId', { userId })
        }

        result
            .leftJoinAndSelect('salary.position', 'position')
            .leftJoinAndSelect('salary.user', 'user')
            .orderBy('position.created_at', 'DESC')
            .orderBy('user.created_at', 'DESC')
            .skip(skip)
            .take(items_per_page)
            .select([
                'salary.id',
                'salary.MaLuong',
                'salary.LuongGio',
                'salary.SoGioLam',
                'salary.SoGioNghi',
                'salary.SoGioMuon',
                'salary.ThucLanh',
                'salary.PhuCap',
                'salary.TamUng',
                'salary.NgayTinhLuong',
                'salary.description',
                'salary.NguoiTao',
                'salary.created_at',
                'salary.updated_at',
                'position.id',
                'position.maCV',
                'position.namePosition',
                'position.degree',
                'position.salary',
                'position.description',
                'position.createdBy',
                'position.created_at',
                'position.updated_at',
                'user.id',
                'user.maNV',
                'user.image',
                'user.name',
                'user.gender',
                'user.date_of_birth',
                'user.CMND',
                'user.status',
                'user.created_at',
                'user.updated_at',
            ])
        const [respone, total] = await result.getManyAndCount();
        const lastPage = Math.ceil(total / items_per_page);
        const nextPage = page + 1 > lastPage ? null : page + 1;
        const prevPage = page - 1 < 1 ? null : page - 1;

        return {
            data: respone,
            total,
            items_per_page,
            currentPage: page,
            nextPage,
            prevPage,
            lastPage,
        };
    }

    async findOne(id: number): Promise<Salary> {
        return await this.salaryRepository.findOne({
            where: { id },
            relations: {
                position: true,
                user: true,
            },
            select: {
                id: true,
                MaLuong: true,
                LuongGio: true,
                SoGioLam: true,
                SoGioNghi: true,
                SoGioMuon:true,
                ThucLanh: true,
                PhuCap: true,
                TamUng:true,
                NgayTinhLuong:true,
                description:true,
                NguoiTao:true,
                created_at: true,
                updated_at: true,
                position: {
                    id: true,
                    maCV: true,
                    namePosition: true,
                    degree: true,
                    salary: true,
                    description: true,
                    createdBy: true,
                    created_at: true,
                    updated_at: true,
                },
                user: {
                    id: true,
                    maNV: true,
                    image: true,
                    name: true,
                    gender: true,
                    date_of_birth: true,
                    CMND: true,
                    status: true,
                    created_at: true,
                    updated_at: true,

                }
            }
        })
    }

    async update(id:number , UpdateSalaryDto:UpdateSalaryDto):Promise<UpdateResult>{
        return await this.salaryRepository.update(id,UpdateSalaryDto)
    }

    async delete(id:number):Promise<DeleteResult>{
        return await this.salaryRepository.softDelete(id);

    }

   
     
}
