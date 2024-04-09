import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/account/entities/account.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { RegisterAccountDto } from './dto/register-account.dto';
import { LoginAccountDto } from './dto/login-account.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { AccountDetails } from './entities/types';



@Injectable()
export class AuthService {
    constructor(@InjectRepository(Account) 
    private accountRepository:Repository<Account>,
    private jwtService:JwtService,
    private configService:ConfigService,
    private mailerService:MailerService
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

    async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<any> {
        const { email } = forgotPasswordDto;
        const account = await this.accountRepository.findOne({ where:{ email} });

        if (!account) {
            throw new HttpException('Không tìm thấy email', HttpStatus.NOT_FOUND);
        }

        const resetToken = await this.generateResetToken(account);
        
        const resetLink = `${this.configService.get('APP_URL')}/reset-password?token=${resetToken}`;

        // Gửi email xác nhận
        await this.sendPasswordResetEmail(email, resetLink, resetToken);
    }

    public async sendPasswordResetEmail(email: string, resetLink: string , resetToken:string): Promise<void> {


        // Gửi email thông báo đổi mật khẩu
        await this.mailerService.sendMail({         
            to: email,
            subject: 'Reset Password Request',
            template: 'reset-password',
            context: {
                resetLink,
                resetToken,
            },
        });
    }

    private async generateResetToken(account: Account): Promise<string> {
        // Tạo một reset token duy nhất
        const resetToken = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
        
        // Cập nhật reset token vào tài khoản
        account.resetToken = resetToken;
        await this.accountRepository.save(account);

        return resetToken;
    }
    
    async resetPassword(resetToken: string, newPassword: string): Promise<any>{
       
        const account = await this.accountRepository.findOne({ where:{resetToken} });
         
        if (!account) {
            throw new HttpException('Invalid reset token', HttpStatus.BAD_REQUEST);
        }

        if (!newPassword) {
            throw new HttpException('Invalid new password', HttpStatus.BAD_REQUEST);
        }

        // Hash mật khẩu mới
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Cập nhật mật khẩu và xoá resetToken
        account.password = hashedPassword;
        account.resetToken = null;
        await this.accountRepository.save(account);
    }

    
    // async validateUser(email: string, password: string): Promise<Account | null> {
    //     const account = await this.accountRepository.findOne({ where:{email} });

    //     if (account && bcrypt.compareSync(password, account.password)) {
    //         return account;
    //     }
    //     return null;
    // }

    async validateAccount(details: AccountDetails){
        console.log('AuthService')
        console.log(details)
        const account = await this.accountRepository.findOneBy({email: details.email})
        console.log(account)
        if(account) return account
        console.log('User not found.creating....')
        const newAccount = this.accountRepository.create(details)
        return this.accountRepository.save(newAccount)
    }

    async findAccount(id: number) {
        const account = await this.accountRepository.findOneBy({id})
        return account
    }


    




}
