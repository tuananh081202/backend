import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripController } from './trip.controller';
import { TripService } from './trip.service';
import { Trip } from './entities/trip.entity';

@Module({
    imports:[
        TypeOrmModule.forFeature([Trip]),
        ConfigModule
    ],
    controllers:[TripController],
    providers:[TripService]
})
export class TripModule {}
