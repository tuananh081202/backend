import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PositionService } from './position.service';
import { FilterPositionDto } from './dto/filter-position.dto';
import { CreatePositionDto } from './dto/create-position.dto';
import { Position } from './entities/position.entity';
import { UpdatePositionDto } from './dto/update-position.dto';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'helpers/config';

@ApiTags('Position')
@Controller('position')
export class PositionController {
    constructor(private readonly positionService: PositionService) { }

    @Get()
    async findAll(@Query() query: FilterPositionDto): Promise<any> {
        return await this.positionService.findAll(query)
    }


    @Post('create')
    async create(@Body() CreatePositionDto: CreatePositionDto): Promise<Position> {
        return await this.positionService.create(CreatePositionDto)
    }

    @Put(':id')
    async updateCategory(@Param('id') id: string, @Body() UpdatePositionDto: UpdatePositionDto) {
        return await this.positionService.updateCategory(Number(id), UpdatePositionDto);
    }

    @Get(':id')

    async findOne(@Param('id') id: string): Promise<Position> {
        return await this.positionService.findOne(Number(id));

    }

    @Delete(':id')

    async deletePosition(@Param('id') id: string) {
        return await this.positionService.delete(Number(id));
    }

    @Post('cke-upload')
    @UseInterceptors(FileInterceptor('upload',{
        storage: storageConfig('ckeditor'),
        fileFilter:(req,file,cb) =>{
            const ext = extname(file.originalname)
            const allowedExtArr=['.jpg','.png','.jpeg'];
            if(!allowedExtArr.includes(ext)){
                req.fileValidationError = `Accept file ext are:${allowedExtArr.toString()}`;
                cb(null,false);
            }else{
                const fileSize= parseInt(req.headers['content-length']);
                if(fileSize > 1024* 1024 * 5){
                    req.fileValidationError='File size is too large'
                    cb(null,false);
                }else{
                    cb(null,true)
                }
            }
        }
    }))
    ckeUpload(@Body() data: any,@UploadedFile() file:Express.Multer.File ){
        console.log('data=>',data)
        console.log(file)

        return{
            'url':`ckeditor/${file.filename}`
        }
    }


}
