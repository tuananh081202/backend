import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { KyluatService } from './kyluat.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateKyLuatDto } from './dto/create-kyluat.dto';
import { FilterKyLuatDto } from './dto/filter-kyluat.dto';
import { UpdateKyLuatDto } from './dto/update-kyluat.dto';
import { Kyluat } from './entities/kyluat.entity';

@ApiTags('Kỷ luật ')
@Controller('kyluat')
export class KyluatController {
    constructor(private readonly kyluatService: KyluatService){}


    @Post('create')
    async create(@Body() createKyLuatDto :CreateKyLuatDto):Promise<Kyluat>{
        return await this.kyluatService.create(createKyLuatDto)
    }

    @Get()
    async findAll(@Query() query:FilterKyLuatDto):Promise<any>{
        return await this.kyluatService.findAll(query)
    }

    @Get(':id')
    async findOne(@Param('id') id:string):Promise<Kyluat>{
        return await this.kyluatService.findOne(Number(id))
    }

    @Put(':id')
    async updateKyLuat(@Param('id') id:string,@Body() updateKyLuatDto:UpdateKyLuatDto){
        return await this.kyluatService.update(Number(id),updateKyLuatDto)
    }

    @Delete(':id')
    async deleteKyLuat(@Param('id') id:string){
        return await this.kyluatService.delete(Number(id))
    }

    

    
}
