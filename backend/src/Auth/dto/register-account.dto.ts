import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterAccountDto {
    @IsNotEmpty()
    fullName:string
 
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(7)
    password: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(7)
    repeatPassword: string;

    @IsNotEmpty()
    phoneNumber: number;
  
    @IsNotEmpty()
    roles:string ;

    status: string;
}