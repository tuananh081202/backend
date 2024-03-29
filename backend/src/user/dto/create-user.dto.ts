import { EmployeeType } from "src/EmployeeType/entities/employeetype.entity"
import { Position } from "src/position/entities/position.entity"

export class CreateUserDto {
    maNV: string

    image:string

    name: string

    gender:string

    date_of_birth:string

    CMND:number

    birthplace:string

    date_range:string

    issued_by:string

    nationality:string

    nation:string
    
    religion:string

    household:string
    
    shelter:string
    
    position!:Position

    employeetype!:EmployeeType

    status:string
}