import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTrackLogin } from './entities/usertracklogin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsertrackloginService {
    constructor(
        @InjectRepository(UserTrackLogin)
        private readonly userTrackLoginRepository: Repository<UserTrackLogin>,
    ) { }

    async logLoginHistory(userTrackLoginData: UserTrackLogin): Promise<UserTrackLogin> {
        const newLoginHistory = this.userTrackLoginRepository.create(userTrackLoginData);
        return await this.userTrackLoginRepository.save(newLoginHistory);
    }

    async getUserLoginHistory(id: number): Promise<UserTrackLogin> {
        return await this.userTrackLoginRepository.findOne({ 
            where:{id} ,
            relations: {
                account: true
            },
            select: {
                id:true,
                ip_address:true,
                type:true,
                created_at:true,
                account: {
                    id: true,
                    avatar: true,
                    fullName: true,
                    email: true,
                    phoneNumber: true,
                    roles: true,
                    status: true,
                    created_at: true,
                    updated_at: true,

                }
            }
        
        });
    }

    async getAllUserLoginHistory(): Promise<UserTrackLogin[]> {
        return await this.userTrackLoginRepository.find({ relations: ['account'] });
        // return await this.userTrackLoginRepository
        // .createQueryBuilder('userTrackLogin')
        // .leftJoinAndSelect('userTrackLogin.account', 'account')
        // .getMany();
    }
}
