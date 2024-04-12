import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTrackLogin } from './entities/usertracklogin.entity';
import { ConfigModule } from '@nestjs/config';
import { UsertrackloginController } from './usertracklogin.controller';
import { UsertrackloginService } from './usertracklogin.service';

@Module({
    imports:[
        TypeOrmModule.forFeature([UserTrackLogin]),
        ConfigModule,
    ],
    controllers:[UsertrackloginController],
    providers:[UsertrackloginService]
})
export class UsertrackloginModule {}
