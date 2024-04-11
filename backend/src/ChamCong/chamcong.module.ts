import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChamcongController } from './chamcong.controller';
import { ChamcongService } from './chamcong.service';
import { ConfigModule } from '@nestjs/config';
import { Chamcong } from './entities/chamcong.entity';

@Module({
    imports:[
        TypeOrmModule.forFeature([Chamcong]),
        ConfigModule
    ],
    controllers:[ChamcongController],
    providers:[ChamcongService]
})
export class ChamcongModule {}