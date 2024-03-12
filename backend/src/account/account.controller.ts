import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { ApiTags } from '@nestjs/swagger';
import { storageConfig } from 'helpers/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { query } from 'express';
import { Account } from './entities/account.entity';
import { FilterAccountDto } from './dto/filter-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@ApiTags('Account')
@Controller('account')
export class AccountController {
    constructor (private accountService:AccountService){}

    @Post('create')
    @UseInterceptors(FileInterceptor('avatar', {
        storage: storageConfig('account'),
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
    create(@Req() req: any, @Body() createAccountDto: CreateAccountDto, @UploadedFile() file: Express.Multer.File) {
        if (req.fileValidationError) {
            throw new BadRequestException(req.fileValidationError);
        }
        if (!file) {
            throw new BadRequestException('File is required!');
        }
        return this.accountService.create({ ...createAccountDto, avatar: file.destination + '/' + file.filename });
        
    }

    @Get('')
    findAll(@Query() query:FilterAccountDto):Promise<Account>{
        return this.accountService.findAll(query)
    }

    @Get(':id')
    findOne(@Param('id') id:string):Promise<Account>{
        return this.accountService.findOne(Number(id))
    }

    @Put(':id')
    @UseInterceptors(FileInterceptor('avatar', {
        storage: storageConfig('account'),
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
    async update(@Param('id') id: string, @Body() UpdateAccountDto: UpdateAccountDto, @Req() req: any, @UploadedFile() file: Express.Multer.File) {
        if (req.fileValidationError) {
            throw new BadRequestException(req.fileValidationError)
        }
        if (file) {
            UpdateAccountDto.avatar = file.destination + '/' + file.filename
        }
        return this.accountService.update(Number(id), UpdateAccountDto)
    }

    
    @Delete(':id')
    async deleteAccount(@Param('id') id: string) {
        return await this.accountService.deleteAccount(Number(id));
    }




   

}
