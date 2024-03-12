import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports:[
        TypeOrmModule.forFeature([User]),
        ConfigModule,
    ],
    controllers:[UserController],
    providers:[UserService]
})
export class UserModule {
}
