import { IsEmail, IsNotEmpty } from "class-validator"

export class LoginAccountDto {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    password:string

}