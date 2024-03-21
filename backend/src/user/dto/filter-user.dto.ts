import { IsOptional, Matches } from "class-validator";

export class FilterUserDto {
    page: string;
    items_per_page: string;
    search: string

    @IsOptional()
    @Matches(/^\d+$/, { message: 'Position cannot be empty.' })
    position? : string
    
    @IsOptional()
    @Matches(/^\d+$/, { message: 'Employeetype cannot be empty.' })
    employeetype?:string
}