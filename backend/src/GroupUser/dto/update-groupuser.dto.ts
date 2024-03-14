import { User } from "src/user/entities/user.entity"

export class UpdateGroupuserDto {
    MaNV: string

    image: string

    GioiTinh: string

    NamSinh: Date

    status: string

    user?:User
}