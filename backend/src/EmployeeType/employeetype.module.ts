import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeType } from './entities/employeetype.entity';
import { ConfigModule } from '@nestjs/config';
import { EmployeetypeController } from './employeetype.controller';
import { EmployeetypeService } from './employeetype.service';

@Module({
    imports:[
        TypeOrmModule.forFeature([EmployeeType]),
        ConfigModule,
    ],
    controllers:[EmployeetypeController],
    providers:[EmployeetypeService]
    
})
export class EmployeetypeModule {}

