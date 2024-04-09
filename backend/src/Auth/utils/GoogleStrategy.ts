import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile } from "passport";
import { Strategy } from "passport-google-oauth20";
import { AuthService } from "../auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject('AUTH_SERVICE') private readonly authService: AuthService
    ){
        super({
            clientID:'539690502789-29c8ahhgtfr5ug38qi3inj9bk3p99i4u.apps.googleusercontent.com',
            clientSecret:'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',
            callbackURL:'http://localhost:5000/api/auth/google/redirect',
            scope: ['profile','email'],
        })
    }

    async validate(accessToken: string,refreshToken:string, profile: Profile){
        console.log(accessToken),
        console.log(refreshToken),
        console.log(profile)
        const  account = await this.authService.validateAccount({
            email: profile.emails[0].value ,
            displayName: profile.displayName,
        })

        console.log('validate')
        console.log(account)
        return account || null
    }
}
