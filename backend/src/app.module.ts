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

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    AccountModule,
    AuthModule,
    PositionModule,
    EmployeetypeModule,
    DepartmentModule,
    SalaryModule,
  ],
  controllers: [AppController ],
  providers: [AppService ],
})
export class AppModule {}
