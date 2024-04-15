import { Body, Controller, Get, Param, Post, SetMetadata } from '@nestjs/common';
import { UsertrackloginService } from './usertracklogin.service';
import { UserTrackLogin } from './entities/usertracklogin.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Lịch sử đăng nhập hệ thống')
@Controller('usertracklogin')
export class UsertrackloginController {
    constructor(private readonly userTrackLoginService: UsertrackloginService) { }

    @SetMetadata('isPublic',true)
    @Post('login-history')
    async logLoginHistory(@Body() userTrackLoginData: UserTrackLogin): Promise<UserTrackLogin> {
        return await this.userTrackLoginService.logLoginHistory(userTrackLoginData);
    }

    @SetMetadata('isPublic',true)
    @Get('login-history/:id')
    async getUserLoginHistory(@Param('id') id: number): Promise<UserTrackLogin> {
        return await this.userTrackLoginService.getUserLoginHistory(id);
    }

    @SetMetadata('isPublic', true)
    @Get('login-history')
    async getAllUserLoginHistory(): Promise<UserTrackLogin[]> {
        return await this.userTrackLoginService.getAllUserLoginHistory();
    }
}
