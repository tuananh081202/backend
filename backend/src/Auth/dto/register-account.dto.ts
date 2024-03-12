import { IsNotEmpty } from "class-validator";

export class RegisterAccountDto {
    @IsNotEmpty()
    fullName:string
 
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    repeatPassword: string;

    @IsNotEmpty()
    phoneNumber: number;
  
    @IsNotEmpty()
    roles:string ;

    status: number;
}