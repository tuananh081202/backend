import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Account]),
        JwtModule.register({
            global: true,
            secret: "1234567",
            signOptions: { expiresIn: '1d' }
        }),
        ConfigModule
    ],
    controllers: [AccountController],
    providers: [AccountService]
})
export class AccountModule {
}
