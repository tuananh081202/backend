import { IsNotEmpty } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class UpdateAccountDto {
    avatar?: string; // Optional

    fullName: string
 
    email: string;

    phoneNumber: number;

    roles:string ;

    status:string;
    
    @IsNotEmpty()
    user!:User
}