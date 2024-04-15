import { Injectable, NestMiddleware, SetMetadata } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UsertrackloginService } from '../usertracklogin.service'; 
import { UserTrackLogin } from '../entities/usertracklogin.entity';
import { AccountService } from 'src/account/account.service';
import { Account } from 'src/account/entities/account.entity';
import { Roles } from 'src/Auth/decorator/roles.decorator';

interface CustomRequest extends Request {
  account?: { id: number }; // Đảm bảo rằng account có thể tồn tại và có thuộc tính id
}

@Injectable()
export class UserLoginMiddleware implements NestMiddleware {
  constructor(
    private readonly userTrackLoginService: UsertrackloginService,
    private readonly accountService: AccountService,  
  ) {}

  async use(req: CustomRequest, res: Response, next: NextFunction) {
    // Lấy thông tin người dùng từ req.account
    const accountId = req.account?.id; // Đảm bảo tồn tại req.account trước khi truy cập vào id

    if (!accountId) {
      // Xử lý trường hợp không tìm thấy thông tin người dùng
      return next(); // hoặc return next(err) nếu bạn muốn bắt lỗi
    }

    // Lấy thông tin tài khoản từ accountId
    const account: Account = await this.accountService.findById(accountId);

    // Ghi nhận lịch sử đăng nhập
    const userTrackLoginData: UserTrackLogin = {
      id: 0, // Thêm id vào đây nếu nó là một thuộc tính bắt buộc của UserTrackLogin
      ip_address: req.ip, // IP của người dùng
      type: 'User/Admin', // Loại sự kiện đăng nhập
      created_at: new Date(), // Thời gian đăng nhập
      account: account, // Thông tin người dùng đăng nhập từ req.account
      // updated_at: new Date(), // Thêm updated_at vào đây nếu nó là một thuộc tính bắt buộc của UserTrackLogin
    };

    await this.userTrackLoginService.logLoginHistory(userTrackLoginData);

    next();
  }
}


