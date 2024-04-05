import { Module } from '@nestjs/common';
import { KyluatService } from './kyluat.service';
import { KyluatController } from './kyluat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kyluat } from './entities/kyluat.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Kyluat]),
    ConfigModule
],
  controllers: [KyluatController],
  providers: [KyluatService]
})
export class KyluatModule {}
