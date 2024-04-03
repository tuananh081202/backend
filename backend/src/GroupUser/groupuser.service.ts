import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateGroupuserDto } from './dto/create-groupuser.dto';
import { GroupUser } from './entities/groupuser.entity';
import { FilterGroupUserDto } from './dto/filter-groupuser.dto';
import { UpdateGroupuserDto } from './dto/update-groupuser.dto';
// import * as fs from 'fs'

@Injectable()
export class GroupuserService {
    constructor(@InjectRepository(GroupUser) private GroupUserRepository: Repository<GroupUser>) { }

    async create(createGroupuserDto: CreateGroupuserDto): Promise<GroupUser> {
        return await this.GroupUserRepository.save(createGroupuserDto)
    }

    async findAll(query: FilterGroupUserDto): Promise<any> {
        const items_per_page = Number(query.items_per_page) || 10;
        const page = Number(query.page) || 1
        const skip = (page - 1) * items_per_page;
        let result = await this.GroupUserRepository.createQueryBuilder('groupuser')
        if (query.search) {
            const search = query.search;
            result.where('(groupuser.MaNV LIKE :search )', { search: `%${search}%` });
        }

        if (query.user) {
            const userId = Number(query.user)
            result.where('groupuser.user = :userId', { userId })
        }
        result
            .leftJoinAndSelect('groupuser.user', 'user')
            .orderBy('user.created_at', 'DESC')
            .skip(skip)
            .take(items_per_page)
            .select([
                'groupuser.id',
                'groupuser.MaNhom',
                'groupuser.TenNhom',
                'groupuser.image',
                'groupuser.GioiTinh',
                'groupuser.NamSinh',
                'groupuser.MoTa',
                'groupuser.createdBy',
                'groupuser.status',
                'groupuser.created_at',
                'groupuser.updated_at',
                'user.id',
                'user.maNV',
                'user.image',
                'user.name',
                'user.gender',
                'user.date_of_birth',
                'user.CMND',
                'user.status',
                'user.created_at',
                'user.updated_at'
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
            lastPage
        };
    }

    async findOne(id: number): Promise<GroupUser> {
        return await this.GroupUserRepository.findOne({
            where: { id },
            relations: {
                user: true
            },
            select: {
                id: true,
                MaNhom:true,
                TenNhom:true,
                image: true,
                GioiTinh: true,
                NamSinh: true,
                MoTa:true,
                createdBy:true,
                status: true,
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

    async update(id:number,UpdateGroupuserDto:UpdateGroupuserDto ):Promise<UpdateResult>{
        // const groupuser = await this.GroupUserRepository.findOneBy({id})
        // if(!groupuser){
        //     throw new NotFoundException('Không cập nhật được !')
        // }
        // if(UpdateGroupuserDto.image){
        //     const imagePath = groupuser.image
        //     if(fs.existsSync(imagePath)){

        //         fs.unlinkSync(imagePath);
        //     }
        // }
        return await this.GroupUserRepository.update(id, UpdateGroupuserDto)
    }

    async delete(id: number): Promise<DeleteResult>{
        // const groupuser = await this.GroupUserRepository.findOneBy({ id })

        // if(!groupuser) {
        //     throw new NotFoundException('Không xóa được nhóm nhân viên')
        // }
        // const imagePath = groupuser.image;
        // if( fs.existsSync(imagePath)) {

        //     fs.unlinkSync(imagePath)
        // }
        return await this.GroupUserRepository.softDelete({id})


    }
}