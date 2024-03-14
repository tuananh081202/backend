import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { GroupuserService } from './groupuser.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'helpers/config';
import { extname } from 'path';
import { CreateGroupuserDto } from './dto/create-groupuser.dto';
import { ApiTags } from '@nestjs/swagger';
import { query } from 'express';
import { FilterGroupUserDto } from './dto/filter-groupuser.dto';
import { GroupUser } from './entities/groupuser.entity';
import { UpdateGroupuserDto } from './dto/update-groupuser.dto';

@ApiTags('Nhóm nhân viên')
@Controller('groupuser')
export class GroupuserController {
    constructor(private GroupuserService: GroupuserService){}

    @Post('create')
    @UseInterceptors(FileInterceptor('image',{
        storage :storageConfig('groupuser'),
        fileFilter: (req,file,cb) => {
            const ext = extname(file.originalname);
            const allowedExtArr = ['.jpg','.png','.jpeg']
            if(!allowedExtArr.includes(ext)){
                req.fileValidationError = `Accept file ext are: ${allowedExtArr.toString()}`;
                cb(null, false);
            } else {
                const fileSize = parseInt(req.headers['content-length']);
                if (fileSize > 1024 * 1024 * 5) {
                    req.fileValidationError = 'File size is too large.Accept file size is less than 5MB';
                    cb(null, false);
                } else {
                    cb(null, true);
                }
            }
        }
    }))
    create(@Req() req: any, @Body() createGroupuserDto: CreateGroupuserDto, @UploadedFile() file: Express.Multer.File) {
        if (req.fileValidationError) {
            throw new BadRequestException(req.fileValidationError);
        }
        if (!file) {
            throw new BadRequestException('File is required!');
        }
        return this.GroupuserService.create({ ...createGroupuserDto, image: file.destination + '/' + file.filename });
        
    }
    
    @Get('')
    async findAll(@Query() query:FilterGroupUserDto):Promise<any>{
        return await this.GroupuserService.findAll(query)
    }
    
    @Get(':id')
    async findOne(@Param('id') id: string):Promise<GroupUser>{
        return await this.GroupuserService.findOne(Number(id))
    }

    @Put(':id')
    @UseInterceptors(FileInterceptor('image', {
        storage: storageConfig('groupuser'),
        fileFilter: (req, file, cb) => {
            const ext = extname(file.originalname);
            const allowedExtArr = ['.jpg', '.pneg', '.png']
            if (!allowedExtArr.includes(ext)) {
                req.fileValidationError = `Accept file ext are:${allowedExtArr.toString()} `
                cb(null, false)
            } else {
                const fileSize = parseInt(req.headers['content-length'])
                if (fileSize > 1024 * 1024 * 5) {
                    req.fileValidationError = 'File size is to large.Accpet file size is less than 5MB'
                    cb(null, false)
                } else {
                    cb(null, true)
                }
            }
        }
    }))
    async update(@Param('id') id: string, @Body() UpdateGroupuserDto: UpdateGroupuserDto, @Req() req: any, @UploadedFile() file: Express.Multer.File) {
        if (req.fileValidationError) {
            throw new BadRequestException(req.fileValidationError)
        }
        if (file) {
            UpdateGroupuserDto.image = file.destination + '/' + file.filename
        }
        return this.GroupuserService.update(Number(id), UpdateGroupuserDto)
    }
    
    @Delete(':id')
    delete(@Param('id') id: string){
        return this.GroupuserService.delete(Number(id))
    }



      
}