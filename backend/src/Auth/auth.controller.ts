import { Body, Controller, Patch, Post ,UsePipes,ValidationPipe} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterAccountDto } from './dto/register-account.dto';
import { Account } from 'src/account/entities/account.entity';
import { LoginAccountDto } from './dto/login-account.dto';
// import { RequestResetPasswordDto } from './dto/request-reset-password.dto';
// import {  ResetPasswordDto } from './dto/reset-password.dto';
import { ForgotPassworDto } from './dto/forgot-password.dto';
// import { ChangePasswordAccountDto } from './dto/changePassword-account.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('register')
    register(@Body() registerAccountDto:RegisterAccountDto):Promise<Account>{
       console.log('register api')
       console.log(registerAccountDto)
       return this.authService.register(registerAccountDto)
    }

    @Post('login')
    @UsePipes(ValidationPipe) 
    login(@Body()loginAccountDto:LoginAccountDto):Promise<any>{
        console.log('login api');
        console.log(loginAccountDto);
        return this.authService.login(loginAccountDto);
    }

    @Post('refresh_token')
    refresh_token(@Body(){refresh_token}):Promise<any>{
        console.log('refresh token api')
        return this.authService.refreshToken(refresh_token);
    }

    // @Post('change-password')
    // async changePassword(@Body() ChangePasswordAccountDto:ChangePasswordAccountDto):Promise<any>{
    //     return await this.authService.changePassword(1,ChangePasswordAccountDto)
    // }
    
    // @Patch('request-reset-password')
    // requestResetPassword(@Body() requestResetPasswordDto:RequestResetPasswordDto):Promise<void>{
    //     return this.authService.requestResetPassword(requestResetPasswordDto)
    // }
    
    // @Post('reset-password')
    // resetPassword(@Body() resetPasswordDto:ResetPasswordDto):Promise<void>{
    //     return this.authService.resetPassword(resetPasswordDto)
        
    // }
    @Post('/forgotPassword')
    async forgotPassword(@Body(new ValidationPipe()) forgotPassworDto:ForgotPassworDto):Promise<any>{

    }
    
}
