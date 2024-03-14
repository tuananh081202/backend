import { Module } from '@nestjs/common';
import { GroupuserService } from './groupuser.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupUser } from './entities/groupuser.entity';
import { ConfigModule } from '@nestjs/config';
import { GroupuserController } from './groupuser.controller';

@Module({
  imports:[
    TypeOrmModule.forFeature([GroupUser]),
    ConfigModule,
  ],
  controllers: [GroupuserController],
  providers: [GroupuserService]
})
export class GroupuserModule {}
