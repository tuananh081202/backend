import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { dataSourceOptions } from 'db/data-source';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { PositionModule } from './position/position.module';
import { EmployeetypeModule } from './EmployeeType/employeetype.module';
import { DepartmentModule } from './department/department.module';
import { SalaryModule } from './salary/salary.module';
import { TripModule } from './trip/trip.module';
import { GroupuserModule } from './GroupUser/groupuser.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { RewardModule } from './reward/reward.module';
import { KyluatModule } from './kyluat/kyluat.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './Auth/roles.guard';
import { AuthGuard } from './Auth/auth.guard';
import { Account } from './account/entities/account.entity';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { ChamcongModule } from './chamcong/chamcong.module';
import { UsertrackloginModule } from './UserTrackLogin/usertracklogin.module';


@Module({
  imports: [

  TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    AccountModule,
    AuthModule,
    ConfigModule.forRoot(),
    PositionModule,
    EmployeetypeModule,
    DepartmentModule,
    SalaryModule,
    TripModule,
    GroupuserModule,
    MailerModule,
    RewardModule,
    KyluatModule,
  TypeOrmModule.forFeature([Account]) ,
  PassportModule.register({session:true}),
  ChamcongModule,
  UsertrackloginModule,
  ],
  controllers: [AppController,  ],
  providers: [AppService, 
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide:APP_GUARD,
      useClass: RolesGuard
    },
   
  ],
})
export class AppModule {}
