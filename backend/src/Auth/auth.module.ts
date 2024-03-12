import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/account/entities/account.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports:[
        TypeOrmModule.forFeature([Account]),
        JwtModule.register({
            global:true,
            secret:'1234567',
            signOptions:{expiresIn:'1d'}

        }),
        ConfigModule
    ],
    controllers:[AuthController],
    providers:[AuthService]
})
export class AuthModule {}
