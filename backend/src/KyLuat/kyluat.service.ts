import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Kyluat } from './entities/kyluat.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateKyLuatDto } from './dto/create-kyluat.dto';
import { UpdateKyLuatDto } from './dto/update-kyluat.dto';
import { FilterKyLuatDto } from './dto/filter-kyluat.dto';

@Injectable()
export class KyluatService {
    constructor(@InjectRepository(Kyluat) private KyLuatRepository:Repository<Kyluat>){}
    

    async create (createKyLuatDto:CreateKyLuatDto):Promise<Kyluat>{
        return await this.KyLuatRepository.save(createKyLuatDto)
    }

    async update (id:number,updateKyLuatDto: UpdateKyLuatDto):Promise<UpdateResult>{
        return await this.KyLuatRepository.update(id,updateKyLuatDto)
    }   

    async delete (id:number):Promise<DeleteResult>{
        return await this.KyLuatRepository.softDelete(id)
    }

    async findAll(query: FilterKyLuatDto): Promise<any> {
        const items_per_page = Number(query.items_per_page) || 10;
        const page = Number(query.page) || 1;
        const skip = (page - 1) * items_per_page;
        let result = await this.KyLuatRepository.createQueryBuilder('kyluat');
        if (query.search) {
            const search = query.search;
            result.where('(kyluat.MaKyLuat LIKE :search OR kyluat.TenKyLuat LIKE :search )', { search: `%${search}%` });
        }

        if (query.user) {
            const userId = Number(query.search);
            result.where('kyluat.user= :userId', { userId })
        }

        result

            .leftJoinAndSelect('kyluat.user', 'user')
            .orderBy('user.created_at', 'DESC')
            .skip(skip)
            .take(items_per_page)
            .select([
                'kyluat.id',
                'kyluat.MaKyLuat',
                'kyluat.TenKyLuat',
                'kyluat.NgayQuyetDinh',
                'kyluat.TenLoai',
                'kyluat.HinhThuc',
                'kyluat.SoTien',
                'kyluat.NgayKyLuat',
                'kyluat.MoTa',
                'kyluat.NguoiTao',
                'kyluat.created_at',
                'kyluat.updated_at',
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
        const [res, total] = await result.getManyAndCount();
        const lastPage = Math.ceil(total / items_per_page);
        const nextPage = page + 1 > lastPage ? null : page + 1;
        const prevPage = page - 1 < 1 ? null : page - 1
        return {
            data: res,
            total,
            items_per_page: query.items_per_page,
            currentPage: page,
            nextPage,
            prevPage,
            lastPage
        };
    }

    async findOne(id: number): Promise<Kyluat> {
        return await this.KyLuatRepository.findOne({
            where: { id },
            relations: {
                user: true,
            },
            select: {
                id: true,
                MaKyLuat: true,
                TenKyLuat: true,
                NgayQuyetDinh: true,
                TenLoai: true,
                HinhThuc: true,
                SoTien: true,
                NgayKyLuat: true,
                MoTa:true,
                NguoiTao:true,
                created_at: true,
                updated_at: true,
                user: {
                    id: true,
                    maNV: true,
                    image: true,
                    name: true,
                    gender: true,
                    date_of_birth: true,
                    birthplace: true,
                    CMND: true,
                    status: true,
                    date_range: true,
                    issued_by: true,
                    nationality: true,
                    nation: true,
                    religion: true,
                    household: true,
                    shelter: true,
                    created_at: true,
                    updated_at: true,
                },
            }
        });
    }


}
