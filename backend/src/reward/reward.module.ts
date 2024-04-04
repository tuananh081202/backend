import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reward } from './entities/reward.entity';
import { ConfigModule } from '@nestjs/config';
import { RewardController } from './reward.controller';
import { RewardService } from './reward.service';

@Module({
    imports:[
      TypeOrmModule.forFeature([Reward]),
      ConfigModule,
    ],
    controllers:[RewardController],
    providers:[RewardService]
   
  })
  export class RewardModule {}