import { Position } from "src/position/entities/position.entity"
import { User } from "src/user/entities/user.entity"

export class UpdateTripDto {

    MaCongTac:string

    NgayBatDau:string

    NgayKetThuc:string

    DiaDiem:string

    MucDich:string

    position!:Position

    user!:User

    TrangThai:string

}