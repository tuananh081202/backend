import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { RewardService } from './reward.service';
import { CreateRewardDto } from './dto/create-reward.dto';
import { Reward } from './entities/reward.entity';
import { query } from 'express';
import { FilterRewardDto } from './dto/filter-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Reward')
@Controller('reward')
export class RewardController {
    constructor(private readonly rewardService: RewardService){}

    @Post('create')
    async create(@Body() createRewardDto:CreateRewardDto):Promise<Reward>{
        return await this.rewardService.create(createRewardDto)
    }
    
    @Get('')
    async findAll(@Query() query:FilterRewardDto):Promise<Reward>{
        return await this.rewardService.findAll(query)
    }

    @Get(':id')
    async findOne(@Param('id') id:string):Promise<Reward>{
        return await this.rewardService.findOne(Number(id))
    }

    @Put(':id')
    async updateReward(@Param('id') id:string,@Body() updateRewardDto:UpdateRewardDto){
        return await this.rewardService.update(Number(id),updateRewardDto)
    }

    @Delete(':id')
    async deleteReward(@Param('id') id:string){
        return await this.rewardService.delete(Number(id))
    }
}
