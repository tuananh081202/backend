import { Injectable } from '@nestjs/common';
import { Trip } from './entities/trip.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { FilterTripDto } from './dto/filter-trip.dto';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
@Injectable()
export class TripService {
    constructor(@InjectRepository(Trip) private tripRepository: Repository<Trip>) { }

    async create(createTripDto: CreateTripDto): Promise<Trip> {
        return await this.tripRepository.save(createTripDto)
    }

    async findAll(query: FilterTripDto): Promise<any> {
        const items_per_page = Number(query.items_per_page) || 10
        const page = Number(query.page) || 1
        const skip = (page - 1) * items_per_page;
        let result = this.tripRepository.createQueryBuilder('trip')
        if (query.search) {
            const search = query.search
            result
                .where('(trip.MaCongTac LIKE :search OR trip.id LIKE :search )', { search: `%${search}` })
        }
        if (query.position) {
            const positionId = Number(query.position)
            result.where('trip.position =:positionId', { positionId })
        }
        if (query.user) {
            const userId = Number(query.user)
            result.where('trip.user =:userId', { userId })
        }

        result
            .leftJoinAndSelect('trip.position', 'position')
            .leftJoinAndSelect('trip.user', 'user')
            .orderBy('position.create_at', 'DESC')
            .orderBy('user.created_at', 'DESC')
            .skip(skip)
            .take(items_per_page)
            .select([
                'trip.id',
                'trip.MaCongTac',
                'trip.NgayBatDau',
                'trip.NgayKetThuc',
                'trip.DiaDiem',
                'trip.MucDich',
                'trip.TrangThai',
                'trip.created_at',
                'trip.updated_at',
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

    async findOne(id: number): Promise<Trip> {
        return await this.tripRepository.findOne({
            where: { id },
            relations: {
                position: true,
                user: true,
            },
            select: {
                id: true,
                MaCongTac:true,
                NgayBatDau: true,
                NgayKetThuc: true,
                DiaDiem: true,
                MucDich: true,
                TrangThai:true, 
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

    async update(id: number, UpdateTripDto: UpdateTripDto): Promise<UpdateResult> {
        return await this.tripRepository.update(id, UpdateTripDto)
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.tripRepository.softDelete(id);

    }
}
