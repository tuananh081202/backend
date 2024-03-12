import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { ConfigModule } from '@nestjs/config';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';

@Module({
    imports:[
        TypeOrmModule.forFeature([Department]),
        ConfigModule,
    ],
    controllers:[DepartmentController],
    providers:[DepartmentService]
})
export class DepartmentModule {}
