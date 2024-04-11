import { User } from "src/user/entities/user.entity"


export class UpdateChamCongDto {
    HoTen:string

    GioVao:string

    GioRa:string

    created_at:Date
    
    user!:User
}