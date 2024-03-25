import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/account/entities/account.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
    imports:[
        TypeOrmModule.forFeature([Account]),
        JwtModule.register({
            global:true,
            secret:'1234567',
            signOptions:{expiresIn:'1d'}

        }),
        ConfigModule.forRoot(),
        MailerModule.forRoot({
            transport: {
              host: 'sandbox.smtp.mailtrap.io',
              port: 465,
              secure: false, // false for TLS; true for SSL
              auth: {
                user: '51c6e05f3ce109',
                pass: '5f0abf96557d0b',
              },
            },
          }),
    ],
    controllers:[AuthController],
    providers:[AuthService]
})
export class AuthModule {}
