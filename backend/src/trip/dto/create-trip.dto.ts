import { Position } from "src/position/entities/position.entity"
import { User } from "src/user/entities/user.entity"

export class CreateTripDto {

    MaCongTac:string

    NgayBatDau:string

    NgayKetThuc:string

    DiaDiem:string

    MucDich:string

    TrangThai:string

    position!:Position

    user!:User

}