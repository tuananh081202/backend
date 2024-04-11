import { Body, Controller,Post,Get, Query, Param, Put, Delete } from '@nestjs/common';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { ApiTags } from '@nestjs/swagger';
import { query } from 'express';
import { FilterTripDto } from './dto/filter-trip.dto';
import { Trip } from './entities/trip.entity';
import { UpdateTripDto } from './dto/update-trip.dto';
import { Roles } from 'src/Auth/decorator/roles.decorator';

@ApiTags('Công tác')
@Controller('trip')
export class TripController {
    constructor(private tripService:TripService){}
    @Roles('Admin')

    @Post('create')
    async create(@Body() CreateTripDto:CreateTripDto):Promise<Trip>{
        return await this.tripService.create(CreateTripDto)

    }
    @Roles('Admin')

    @Get('')
    async findAll(@Query() query:FilterTripDto):Promise<any>{
        return await this.tripService.findAll(query)
    }
    
    @Roles('Admin')

    @Get(':id')
    async findOne(@Param('id') id:string):Promise<Trip>{
        return await this.tripService.findOne(Number(id))
    }

    @Roles('Admin')

    @Put(':id')
    async updateTrip(@Param('id') id:string,@Body() UpdateTripDto:UpdateTripDto){
        return await this.tripService.update(Number(id),UpdateTripDto)
    }

    @Roles('Admin')

    @Delete(':id')
    async DeleteTrip(@Param('id') id:string){
        return await this.tripService.delete(Number(id))
    }
}
