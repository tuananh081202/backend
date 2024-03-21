import { InjectRepository } from "@nestjs/typeorm";
import { Account } from "./entities/account.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { CreateAccountDto } from "./dto/create-account.dto";
import * as bcrypt from 'bcrypt';
import { FilterAccountDto } from "./dto/filter-account.dto";
import { NotFoundException } from "@nestjs/common";
import { UpdateAccountDto } from "./dto/update-account.dto";
import * as fs from 'fs'
export class AccountService {
    constructor(
        @InjectRepository(Account) private accountRepository: Repository<Account>
    ) { }

    async create(createAccountDto: CreateAccountDto): Promise<Account> {
        const hashPassword = await this.hashPassword(createAccountDto.password);
        const Password = await this.hashPassword(createAccountDto.repeatPassword)
        return await this.accountRepository.save({ ...createAccountDto, refresh_token: "refresh_token_string", password: hashPassword, repeatPassword: hashPassword });
    }

    private async hashPassword(password: string): Promise<string> {
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const hash = await bcrypt.hash(password, salt);

        return hash;
    }

    async findAll(query: FilterAccountDto): Promise<any> {
        const items_per_page = Number(query.items_per_page) || 10
        const page = Number(query.page) || 1
        const skip = (page - 1) * items_per_page;
        let result = await this.accountRepository.createQueryBuilder('account')
        if (query.search) {
            const search = query.search
            result.where('(account.fullName LIKE :search OR account.email LIKE :search OR account.phoneNumber LIKE :search)', { search: `%${search}%` });
        }
        if (query.user) {
            const userId = Number(query.user);
            result.where('account.user = :userId', { userId })
        }
        result
            .leftJoinAndSelect('account.user', 'user')
            .orderBy('user.created_at', 'DESC')
            .skip(skip)
            .take(items_per_page)
            .select([
                'account.id',
                'account.avatar',
                'account.fullName',
                'account.email',
                'account.phoneNumber',
                'account.roles',
                'account.status',
                'account.created_at',
                'account.updated_at',

                'user.id',
                'user.maNV',
                'user.image',
                'user.name',
                'user.gender',
                'user.date_of_birth',
                'user.birthplace',
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

    async findOne(id: number): Promise<Account> {
        return await this.accountRepository.findOne({
            where: { id },
            relations: {
                user: true
            },
            select: {
                id: true,
                avatar: true,
                fullName: true,
                email: true,
                phoneNumber: true,
                roles: true,
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
                    birthplace:true,
                    CMND: true,
                    status: true,
                    created_at: true,
                    updated_at: true,

                }
            }
        })
    }

    async update(id: number, UpdateAccountDto:UpdateAccountDto): Promise<UpdateResult> {
        const account = await this.accountRepository.findOneBy({id});
        if (!account) {
            throw new NotFoundException('Không cập nhật được tài khoản');
        }
        if (UpdateAccountDto.avatar) {
            const imagePath = account.avatar;
            if (fs.existsSync(imagePath)) {
               
                fs.unlinkSync(imagePath);
            }
        }       
        return await this.accountRepository.update(id, UpdateAccountDto);   
       
    }

    async deleteAccount(id: number): Promise<DeleteResult> {
        const account = await this.accountRepository.findOneBy({ id });
        if (!account) {
            throw new NotFoundException('Không xóa được tài khoản')
        }
        const imagePath = account.avatar;
        if (fs.existsSync(imagePath)) {

            fs.unlinkSync(imagePath);
        }
        return await this.accountRepository.softDelete({ id })
    }
    



}
