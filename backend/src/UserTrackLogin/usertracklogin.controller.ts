import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsertrackloginService } from './usertracklogin.service';
import { UserTrackLogin } from './entities/usertracklogin.entity';

@Controller('usertracklogin')
export class UsertrackloginController {
    constructor(private readonly userTrackLoginService: UsertrackloginService) { }

    @Post('login-history')
    async logLoginHistory(@Body() userTrackLoginData: UserTrackLogin): Promise<UserTrackLogin> {
        return await this.userTrackLoginService.logLoginHistory(userTrackLoginData);
    }

    @Get('login-history/:userId')
    async getUserLoginHistory(@Param('userId') userId: number): Promise<UserTrackLogin[]> {
        return await this.userTrackLoginService.getUserLoginHistory(userId);
    }
}
