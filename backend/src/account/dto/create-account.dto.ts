import { IsNotEmpty } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class CreateAccountDto {
    fullName: string
 
    email: string;

    password: string;

    repeatPassword: string;

    phoneNumber: number;

    avatar?: string; // Optional
  
    roles:string ;

    status: number;
    
    @IsNotEmpty()
    user!:User
}