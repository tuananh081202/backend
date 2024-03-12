import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { dataSourceOptions } from 'db/data-source';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { PositionController } from './position/position.controller';
import { PositionModule } from './position/position.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    AccountModule,
    AuthModule,
    PositionModule],
  controllers: [AppController, PositionController],
  providers: [AppService],
})
export class AppModule {}
