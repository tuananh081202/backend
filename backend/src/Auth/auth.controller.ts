import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Patch, Post, Req, SetMetadata, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterAccountDto } from './dto/register-account.dto';
import { Account } from 'src/account/entities/account.entity';
import { LoginAccountDto } from './dto/login-account.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { GoogleAuthGuard } from './utils/Guards';
import { Request } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    @SetMetadata('isPublic',true)   
    register(@Body() registerAccountDto: RegisterAccountDto): Promise<Account> {
        console.log('register api')
        console.log(registerAccountDto)
        return this.authService.register(registerAccountDto)
    }

    @Post('login')
    @SetMetadata('isPublic',true)
    @UsePipes(ValidationPipe)
    login(@Body() loginAccountDto: LoginAccountDto): Promise<any> {
        console.log('login api');
        console.log(loginAccountDto);
        return this.authService.login(loginAccountDto);
    }

    @Post('refresh_token')
    @SetMetadata('isPublic',true)
    refresh_token(@Body() { refresh_token }): Promise<any> {
        console.log('refresh token api')
        return this.authService.refreshToken(refresh_token);
    }
    
    @Post('forgot-password')
    @SetMetadata('isPublic',true)

    async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<any> {
        try {
            const { email } = forgotPasswordDto;
            await this.authService.forgotPassword({email});
            console.log('forgot-password')
            console.log(forgotPasswordDto)
            return { message: 'Đã gửi thông báo đến email' };
        } catch (error) {
            throw new HttpException(error.message || 'Lỗi không gửi được thông báo', HttpStatus.BAD_REQUEST);
        }
    }

    @Post('reset-password')
    @SetMetadata('isPublic',true)
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<any> {
        try {
            const { resetToken, newPassword } = resetPasswordDto;
            await this.authService.resetPassword(resetToken, newPassword);
            console.log('reset-password api')
            console.log(resetPasswordDto)
            return { message: 'Password reset successfully' };

        } catch (error) {
            throw new HttpException(error.message || 'Failed to reset password', HttpStatus.BAD_REQUEST);
        }
    }
    @SetMetadata('isPublic',true)
    @Get('google/login')
    @UseGuards(GoogleAuthGuard)
    handleLogin(){
        return {msg: 'google authentication'};
    }

    @Get('google/redirect')
    @SetMetadata('isPublic',true)
    @UseGuards(GoogleAuthGuard)
    handleRedirect(){
        return {msg: 'OK'}
    }

    @Get('status')
    @SetMetadata('isPublic',true)
    account(@Req() request: Request) {
        console.log(request.user)
        if(request.user){
            return {msg: 'Authenticated'}
        } else {
            return {msg: 'Not Authenticated'}
        }
    }




}
