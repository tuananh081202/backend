import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class CreateAccountDto {
    fullName: string
 
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(7)
    password: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(7)
    repeatPassword: string;

    phoneNumber: number;

    avatar?: string; // Optional
  
    roles:string ;

    status: string;
    
    @IsNotEmpty()
    user!:User
}