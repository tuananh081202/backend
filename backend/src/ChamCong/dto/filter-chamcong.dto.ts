import { IsOptional, Matches } from "class-validator"

export class FilterChamCongDto {
    page: string 

    items_per_page:string

    search: string

    @IsOptional()
    @Matches(/^\d+$/, { message: 'User cannot be empty.' })
    user?:string
}