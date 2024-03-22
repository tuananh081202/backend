import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class ForgotPassworDto {
    @IsNotEmpty()
    @ApiProperty()
    email:string
}