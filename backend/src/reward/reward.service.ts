import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reward } from './entities/reward.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';
import { FilterRewardDto } from './dto/filter-reward.dto';

@Injectable()
export class RewardService {
    constructor(@InjectRepository(Reward) private rewardRepository: Repository<Reward>) { }

    async create(createRewardDto: CreateRewardDto): Promise<Reward> {
        return await this.rewardRepository.save(createRewardDto)
    }

    async findAll(query: FilterRewardDto): Promise<any> {
        const items_per_page = Number(query.items_per_page) || 10;
        const page = Number(query.page) || 1;
        const skip = (page - 1) * items_per_page;
        let result = await this.rewardRepository.createQueryBuilder('reward');
        if (query.search) {
            const search = query.search;
            result.where('(reward.MaKhenThuong LIKE :search OR reward.TenKhenThuong LIKE :search )', { search: `%${search}%` });
        }

        if (query.user) {
            const userId = Number(query.search);
            result.where('reward.user= :userId', { userId })
        }

        result

            .leftJoinAndSelect('reward.user', 'user')
            .orderBy('user.created_at', 'DESC')
            .skip(skip)
            .take(items_per_page)
            .select([
                'reward.id',
                'reward.MaKhenThuong',
                'reward.TenKhenThuong',
                'reward.NgayQuyetDinh',
                'reward.HinhThuc',
                'reward.SoTien',
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

    async findOne(id: number): Promise<Reward> {
        return await this.rewardRepository.findOne({
            where: { id },
            relations: {
                user: true,
            },
            select: {
                id: true,
                MaKhenThuong: true,
                TenKhenThuong: true,
                NgayQuyetDinh: true,
                HinhThuc: true,
                SoTien: true,
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


    async update(id: number, updateRewardDto: UpdateRewardDto): Promise<UpdateResult> {
        return await this.rewardRepository.update(id, updateRewardDto)
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.rewardRepository.softDelete(id)
    }
}
