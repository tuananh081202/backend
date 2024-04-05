import { User } from "src/user/entities/user.entity"

export class UpdateKyLuatDto {
    MaKyLuat:string

    TenKyLuat:string

    NgayQuyetDinh:string

    TenLoai:string
    
    HinhThuc: string

    SoTien: number

    NgayKyLuat: string

    MoTa: string

    NguoiTao: string

    user!: User

}