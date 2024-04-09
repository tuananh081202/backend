import { Inject, Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { AuthService } from "../auth.service";

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(
        @Inject('AUTH_SERVICE') private readonly authService:AuthService
    ){
        super();
    }

    serializeUser(account: any, done: Function) {
        console.log('Serializer User')
        done(null,account)
    }

    async deserializeUser(payload: any, done: Function) {
        const account = await this.authService.findAccount(payload.id)
        console.log('Deserialize User')
        console.log(account)
        return account ? done(null,account) : done(null,null)
    }
}