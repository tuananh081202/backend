import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UsertrackloginService } from '../usertracklogin.service'; 
import { UserTrackLogin } from '../entities/usertracklogin.entity';
@Injectable()
export class UserLoginMiddleware implements NestMiddleware {
  constructor(private readonly userTrackLoginService: UsertrackloginService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // Ghi nhận lịch sử đăng nhập
    const userTrackLoginData: UserTrackLogin = {
      ip_address: req.ip, // IP của người dùng
      type: 'login', // Loại sự kiện đăng nhập
      created_at: new Date(), // Thời gian đăng nhập
      // User cần phải được gán từ request, chẳng hạn như thông qua authentication middleware
      user: req.user, // Thông tin người dùng đăng nhập
    };
    await this.userTrackLoginService.logLoginHistory(userTrackLoginData);

    next();
  }
}
