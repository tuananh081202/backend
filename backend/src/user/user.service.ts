import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as fs from 'fs'

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
        result.orderBy('created_at', 'DESC')
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
                'user.status',
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

    async findOne(id: number): Promise<User> {
        return await this.UserRepository.findOneBy({ id })
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
