import { Body, Controller, Post,Get, Query, SetMetadata, Param, Put, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChamcongService } from './chamcong.service';
import { CreateChamCongDto } from './dto/create-chamcong.dto';
import { Chamcong } from './entities/chamcong.entity';
import { FilterChamCongDto } from './dto/filter-chamcong.dto';
import { UpdateChamCongDto } from './dto/update-chamcong.dto';


@ApiTags('Chấm công')
@Controller('chamcong')
export class ChamcongController {
    constructor(private ChamcongService: ChamcongService){}

    @SetMetadata('isPublic',true)
    @Post('create')
    async create(@Body() createChamCongDto: CreateChamCongDto):Promise<Chamcong>{
        return await this.ChamcongService.create(createChamCongDto)
    }

    @Get('')
    @SetMetadata('isPublic',true)
    async findAll(@Query() query:FilterChamCongDto):Promise<any>{
        return await this.ChamcongService.findAll(query)
    }

    @Get(':id')
    @SetMetadata('isPublic',true)

    async findOne(@Param('id') id:string):Promise<Chamcong>{
        return await this.ChamcongService.findOne(Number(id))
    }

    @Put(':id')
    async update(@Param('id') id:string,@Body() UpdateChamCongDto:UpdateChamCongDto){
        return await this.ChamcongService.update(Number(id),UpdateChamCongDto)
    }

    @Delete(':id')
    async deleteChamCong(@Param('id') id:string){
        return await  this.ChamcongService.delete(Number(id))
    }

}
