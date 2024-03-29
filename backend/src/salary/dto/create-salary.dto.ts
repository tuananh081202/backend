import { IsNotEmpty } from "class-validator"
import { Position } from "src/position/entities/position.entity"
import { User } from "src/user/entities/user.entity"

export class CreateSalaryDto {
   
    MaLuong: string

    user!:User

    position!:Position
    
    @IsNotEmpty()
    NgayCong: number

    LuongThang:number

    ThucLanh:number

    PhuCap: number

    TamUng: number

    NgayTinhLuong: Date

    MoTa:string

    NguoiTao:string
}