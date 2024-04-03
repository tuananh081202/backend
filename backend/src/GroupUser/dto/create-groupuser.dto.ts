import { User } from "src/user/entities/user.entity"

export class CreateGroupuserDto {
    MaNhom:string

    TenNhom:string

    MoTa:string

    createdBy:string

    image:string

    user!:User

    GioiTinh:string

    NamSinh:string

    status:string


}