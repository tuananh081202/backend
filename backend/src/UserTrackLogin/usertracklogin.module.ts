import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsertrackloginController } from './usertracklogin.controller';
import { UsertrackloginService } from './usertracklogin.service';
import { UserTrackLogin } from './entities/usertracklogin.entity';

@Module({
    imports:[
        TypeOrmModule.forFeature([UserTrackLogin]),
        ConfigModule,
    ],
    controllers:[UsertrackloginController],
    providers:[UsertrackloginService]
})
export class UsertrackloginModule {}
