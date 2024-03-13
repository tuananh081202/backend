import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/account/entities/account.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { RegisterAccountDto } from './dto/register-account.dto';
import { LoginAccountDto } from './dto/login-account.dto';
import { RequestResetPasswordDto } from './dto/request-reset-password.dto';
// import { ChangePasswordAccountDto } from './dto/changePassword-account.dto';
import {v4} from 'uuid'
import { ResetPasswordDto } from './dto/reset-password.dto';


@Injectable()
export class AuthService {
    constructor(@InjectRepository(Account) 
    private accountRepository:Repository<Account>,
    private jwtService:JwtService,
    private configService:ConfigService,
    // private mailerService:MailerService
    ){}
    
    async register(registerAccountDto:RegisterAccountDto):Promise<Account>{
        const hashPassword= await this.hashPassword(registerAccountDto.password);
        const Password= await this.hashPassword(registerAccountDto.repeatPassword);
        return await this.accountRepository.save({...registerAccountDto,refresh_token:"refresh_token_string",password: hashPassword,repeatPassword: Password});
    }
    
    async login(loginAccountDto:LoginAccountDto):Promise<any>{
        const account=await this.accountRepository.findOne(
        {    
            where:{email:loginAccountDto.email}
        }
    )
    await new Promise(resolve => setTimeout(resolve,2000))
    if(!account){
        throw new HttpException("Email is not exist",HttpStatus.UNAUTHORIZED);
    }
    const checkPass = bcrypt.compareSync(loginAccountDto.password,account.password);
    if(!checkPass){
        throw new HttpException('Password is not correct',HttpStatus.UNAUTHORIZED);
    }
    //generate access token and refresh token
    const payload = {id:account.id,email:account.email};
    return this.generateToken(payload)
}

    async refreshToken(refresh_token:string):Promise<any>{
        try {
            const verify = await this.jwtService.verifyAsync(refresh_token,{
                secret:this.configService.get<string>('SECRET')
            })
            
            const checkExistToken = await this.accountRepository.findOneBy({email:verify.email,refresh_token})
            if(checkExistToken){
                return this.generateToken({id:verify.id,email:verify.email})

            }else{
            throw new HttpException('Refresh token is not valid',HttpStatus.BAD_REQUEST)
            }
        } catch (error) {
            throw new HttpException('Refresh token is not valid',HttpStatus.BAD_REQUEST)
        }
    }
    private async generateToken(payload:{id:number,email:string}){
        const access_token = await this.jwtService.signAsync(payload); 
        const refresh_token=await this.jwtService.signAsync(payload,{
            secret:this.configService.get<string>('SECRET'),
            expiresIn:'1d'
                                                        
        })
        await this.accountRepository.update(
            {email:payload.email},
            {refresh_token:refresh_token}
        )
        return{access_token, refresh_token};
    }
        
        

    private async hashPassword(password: string):Promise<string> {
        const saltRound =10;
        const salt = await bcrypt.genSalt(saltRound);

        const hash =await bcrypt.hash(password, salt);

        return hash;

    }

    // async changePassword(userId: number, changePasswordDto: ChangePasswordAccountDto): Promise<any> {
    //     try {
    //       const account = await this.accountRepository.findOneOrFail({where:{id:userId}});
    
    //       // Validate current password
    //       const isCurrentPasswordMatch = await bcrypt.compare(changePasswordDto.currentPassword, account.password);
    //       if (!isCurrentPasswordMatch) {
    //         throw new HttpException('Current password is incorrect', HttpStatus.UNAUTHORIZED);
    //       }
    
    //       // Validate new password and confirm password
    //       if (changePasswordDto.newPassword !== changePasswordDto.confirmPassword) {
    //         throw new HttpException('New password and confirm password do not match', HttpStatus.BAD_REQUEST);
    //       }
    
    //       // Hash the new password
    //       const hashedNewPassword = await bcrypt.hash(changePasswordDto.newPassword, 10);
    
    //       // Update account with new password
    //       account.password = hashedNewPassword;
    //       await this.accountRepository.save(account);
    //     } catch (error) {
    //       if (error.name === 'EntityNotFound') {
    //         throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    //       } else {
    //         // Handle other potential errors (e.g., database errors)
    //         throw new HttpException('An error occurred during password change', HttpStatus.INTERNAL_SERVER_ERROR);
    //       }
    //     }
    // }
    async requestResetPassword(requestResetPasswordDto: RequestResetPasswordDto): Promise<void> {
        try {
          const account = await this.accountRepository.findOne({ where: { email: requestResetPasswordDto.email } });
    
          if (!account) {
            throw new HttpException('Email not found', HttpStatus.NOT_FOUND);
          }
    
          // Generate a secure random token (e.g., using UUID v4)
          const resetToken = v4();
    
          // Update account with reset token and timestamp
          account.reset_password_token = resetToken;
          
          await this.accountRepository.save(account);
    
          // Send password reset email to the user
          // (This implementation is not included here, but you'll need to use an email service)
          // ... send email notification with reset link ...
    
        } catch (error) {
          // Handle errors appropriately (e.g., database errors)
          throw new HttpException('An error occurred during password reset', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
    
    

   


}
