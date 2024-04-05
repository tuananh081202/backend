import { User } from "src/user/entities/user.entity"

export class UpdateRewardDto {
    MaKhenThuong:string

    TenKhenThuong: string

    NgayQuyetDinh: string

    HinhThuc: string

    SoTien: number

    NgayKhenThuong: string

    MoTa: string

    NguoiTao: string

    user! :User
}