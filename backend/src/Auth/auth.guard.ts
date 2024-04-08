import {
    CanActivate,
    ExecutionContext,
    HttpException,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reflector } from '@nestjs/core';
import { Account } from 'src/account/entities/account.entity';


  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
      private jwtService: JwtService,
      private configService:ConfigService,
      @InjectRepository(Account) private accountRepository:Repository<Account>,
      private reflector : Reflector
       
      ) {}
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
      console.log("Vao Authguard =======>set account vào request")

      const isPublic = this.reflector.getAllAndOverride<string[]>('isPublic',[
        context.getHandler(),
        context.getClass()
    ])
    if(isPublic){
      return true;
    }
      console.log("isPublic=> ",isPublic)
   
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: this.configService.get<string>('SECRET')
          }
        );
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        const account = await this.accountRepository.findOneBy({ id:payload.id })
        request ['account'] = account
        request['account_data'] = payload;
      } catch {
        throw new UnauthorizedException()
         
        
    }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }