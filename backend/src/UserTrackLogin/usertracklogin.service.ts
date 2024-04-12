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

    async getUserLoginHistory(userId: number): Promise<UserTrackLogin[]> {
        return await this.userTrackLoginRepository.find({ where: { user: { id: userId } } });
    }
}
