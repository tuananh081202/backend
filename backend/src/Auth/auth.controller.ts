import { Body, Controller, Post ,UsePipes,ValidationPipe} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterAccountDto } from './dto/register-account.dto';
import { Account } from 'src/account/entities/account.entity';
import { LoginAccountDto } from './dto/login-account.dto';

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
}
