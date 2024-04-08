import { IsNotEmpty } from "class-validator"
import { Position } from "src/position/entities/position.entity"
import { User } from "src/user/entities/user.entity"

export class CreateSalaryDto {
   
    MaLuong: string

    user!:User

    position!:Position

    LuongGio:number

    SoGioLam: number

    SoGioNghi: number

    SoGioMuon:number;

    ThucLanh:number

    PhuCap: number

    TamUng: number

    NgayTinhLuong: string

    MoTa:string

    NguoiTao:string
}