import { Module } from '@nestjs/common';
import { PositionService } from './position.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Position } from './entities/position.entity';
import { ConfigModule } from '@nestjs/config';
import { PositionController } from './position.controller';

@Module({
  imports:[
    TypeOrmModule.forFeature([Position]),
    ConfigModule,
  ],
  controllers:[PositionController],
  providers:[PositionService]
 
})
export class PositionModule {}
