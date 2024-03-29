import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Salary } from './entities/salary.entity';
import { ConfigModule } from '@nestjs/config';
import { SalaryController } from './salary.controller';
import { SalaryService } from './salary.service';

@Module({
    imports:[
        TypeOrmModule.forFeature([Salary]),
        ConfigModule,
    ],
    controllers:[SalaryController],
    providers:[SalaryService]
})
export class SalaryModule {}
