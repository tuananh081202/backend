import { Position } from "src/position/entities/position.entity"
import { User } from "src/user/entities/user.entity"

export class CreateTripDto {

    MaCongTac:string

    NgayBatDau:Date

    NgayKetThuc:Date

    DiaDiem:string

    MucDich:string

    position!:Position

    user!:User

}