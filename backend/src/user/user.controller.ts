import { BadRequestException, Body, Controller,Delete,Get, Param, Post, Put, Query, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { storageConfig } from 'helpers/config';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { FilterUserDto } from './dto/filter-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/Auth/decorator/roles.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private userService:UserService){}

    @Post('create')
    @UseInterceptors(FileInterceptor('image', {
        storage: storageConfig('user'),
        fileFilter: (req, file, cb) => {
            const ext = extname(file.originalname);
            const allowedExtArr = ['.jpg', '.png', '.jpeg'];
            if (!allowedExtArr.includes(ext)) {
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
    create(@Req() req: any, @Body() createUserDto: CreateUserDto, @UploadedFile() file: Express.Multer.File) {
        if (req.fileValidationError) {
            throw new BadRequestException(req.fileValidationError);
        }
        if (!file) {
            throw new BadRequestException('File is required!');
        }
        return this.userService.create({ ...createUserDto, image: file.destination + '/' + file.filename });
        
    }
    
    @Roles('Admin')
    @Get('')
    findAll(@Query() query:FilterUserDto):Promise<User>{
        return this.userService.findAll(query)
    }

    @Get(':id')
    findOne(@Param('id') id:string):Promise<User>{
        return this.userService.findOne(Number(id))
    }

    @Put(':id')
    @UseInterceptors(FileInterceptor('image', {
        storage: storageConfig('user'),
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
    async update(@Param('id') id: string, @Body() UpdateUserDto: UpdateUserDto, @Req() req: any, @UploadedFile() file: Express.Multer.File) {
        if (req.fileValidationError) {
            throw new BadRequestException(req.fileValidationError)
        }
        if (file) {
            UpdateUserDto.image = file.destination + '/' + file.filename
        }
        return this.userService.update(Number(id), UpdateUserDto)
    }

    @Delete(':id')

    async deleteUser(@Param('id') id: string) {
        return await this.userService.deleteUser(Number(id));
    }
}

    
