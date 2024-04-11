import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chamcong } from './entities/chamcong.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateChamCongDto } from './dto/create-chamcong.dto';
import { UpdateChamCongDto } from './dto/update-chamcong.dto';
import { FilterChamCongDto } from './dto/filter-chamcong.dto';

@Injectable()
export class ChamcongService {
    constructor(@InjectRepository(Chamcong) private ChamCongRepository:Repository<Chamcong>){}

    async create(createChamCongDto: CreateChamCongDto):Promise<Chamcong>{
        return await this.ChamCongRepository.save(createChamCongDto)
    }

    async update(id:number , UpdateChamCongDto:UpdateChamCongDto):Promise<UpdateResult>{
        return await this.ChamCongRepository.update(id,UpdateChamCongDto)
    }

    async delete (id:number):Promise<DeleteResult>{
        return await this.ChamCongRepository.softDelete(id)
    }

    async findAll (query:FilterChamCongDto):Promise<any>{
        const items_per_page = Number(query.items_per_page) || 10
        const page = Number(query.page) || 1
        const skip = (page - 1) * items_per_page;
        let result = await this.ChamCongRepository.createQueryBuilder('chamcong')
        if (query.search) {
            const search = query.search
            result.where('(chamcong.HoTen LIKE :search)', { search: `%${search}%` })
        }

        if (query.user) {
            const userId = Number(query.search)
            result.where('chamcong.user= :userId',{userId})
        }

        result
            .leftJoinAndSelect('chamcong.user', 'user')
            .orderBy('user.created_at','DESC')
            .skip(skip)
            .take(items_per_page)
            .select([
                'chamcong.id',
                'chamcong.HoTen',
                'chamcong.GioVao',
                'chamcong.GioRa',
                'chamcong.created_at',
                'chamcong.updated_at',
                
                'user.id',
                'user.maNV',
                'user.image',
                'user.name',
                'user.gender',
                'user.date_of_birth',
                'user.CMND',
                'user.birthplace',
                'user.status',
                'user.date_range',
                'user.issued_by',
                'user.nationality',
                'user.nation',
                'user.religion',
                'user.household',
                'user.shelter',
                'user.created_at',
                'user.updated_at',
            ])
        const [res, total] = await result.getManyAndCount()
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

    async findOne(id: number): Promise<Chamcong> {
        return await this.ChamCongRepository.findOne({
            where: { id },
            relations: {
                
                user: true,
            },
            select: {
                id: true,
                HoTen:true,
                GioVao: true,
                GioRa: true,
                created_at: true,
                updated_at: true,
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


}
