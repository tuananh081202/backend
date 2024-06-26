import { EmployeeType } from "src/EmployeeType/entities/employeetype.entity"
import { Position } from "src/position/entities/position.entity"

export class UpdateUserDto {
    maNv: string

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

    selter:string
    
    household:string
    
    position!:Position

    employeetype!:EmployeeType

    status:string
}