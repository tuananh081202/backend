import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as fs from 'fs'
import { stringify } from 'querystring';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private UserRepository: Repository<User>
    ) { }

    async create(CreateUserDto: CreateUserDto): Promise<User> {
        return await this.UserRepository.save(CreateUserDto)
    }

    async findAll(query: FilterUserDto): Promise<any> {
        const items_per_page = Number(query.items_per_page) || 10;
        const page = Number(query.page) || 1;
        const skip = (page - 1) * items_per_page;
        let result = await this.UserRepository.createQueryBuilder('user');
        if (query.search) {
            const search = query.search;
            result.where('(user.maNV LIKE :search OR user.name LIKE :search OR user.CMND LIKE :search)', { search: `%${search}%` });
        }

        if (query.position) {
            const positionId = Number(query.search);
            result.where('user.position= :positionId',{ positionId })
        }

        if (query.employeetype) {
            const employeetypeId = Number(query.search);
            result.where('user.employeetype= :employeetypeId',{ employeetypeId })
        }
        result
            .leftJoinAndSelect('user.position', 'position')
            .leftJoinAndSelect('user.employeetype', 'employeetype')
            .orderBy('position.created_at', 'DESC')
            .orderBy('employeetype.created_at', 'DESC')
            .skip(skip)
            .take(items_per_page)
            .select([
                'user.id',
                'user.maNV',
                'user.image',
                'user.name',
                'user.gender',
                'user.date_of_birth',
                'user.CMND',
                'user.birthplace',
                'user.status',
                'user.created_at',
                'user.updated_at',
                'position.id',
                'position.maCV',
                'position.namePosition',
                'position.degree',
                'position.salary',
                'position.description',
                'position.createdBy',
                'position.created_at',
                'position.updated_at',
                'employeetype.id',
                'employeetype.MaLoai',
                'employeetype.LoaiNV',
                'employeetype.description',
                'employeetype.createdBy',
                'employeetype.created_at',
                'employeetype.updated_at',
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

    async findOne(id: number): Promise<User> {
        return await this.UserRepository.findOne({
            where: { id },
            relations: {
                position: true,
                employeetype:true,
            },
            select: {
                id: true,
                maNV: true,
                image: true,
                name: true,
                gender: true,
                date_of_birth: true,
                birthplace: true,
                CMND: true,
                status: true,
                created_at: true,
                updated_at: true,
                position: {
                    id: true,
                    maCV: true,
                    namePosition: true,
                    degree: true,
                    salary: true,
                    description: true,
                    createdBy:true,
                    created_at: true,
                    updated_at: true,
                },
                employeetype:{
                    id: true,
                    MaLoai: true,
                    description: true,                                   
                    createdBy:true,
                    created_at: true,
                    updated_at: true,
                }

            }
        });
    }


    async update(id: number, UpdateUserDto: UpdateUserDto): Promise<UpdateResult> {
        const user = await this.UserRepository.findOneBy({ id })
        if (!user) {
            throw new NotFoundException('Không cập nhật được nhân viên')
        }
        if (UpdateUserDto.image) {
            const imagePath = user.image
            if (fs.existsSync(imagePath)) {

                fs.unlinkSync(imagePath);
            }
        }
        return await this.UserRepository.update(id, UpdateUserDto)
    }

    async deleteUser(id: number): Promise<DeleteResult> {
        const user = await this.UserRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException('Không xóa được nhân viên')
        }
        const imagePath = user.image;
        if (fs.existsSync(imagePath)) {

            fs.unlinkSync(imagePath);
        }
        return await this.UserRepository.softDelete({ id })
    }



}
