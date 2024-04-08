import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor (private reflector: Reflector ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean>  {
        console.log('Vào RolesGuard')

        const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles',[
            context.getHandler(),
            context.getClass()
        ])
        if(!requiredRoles) {
            return true;
        }
        console.log('requiredRoles=>', requiredRoles)
        const {account} = context.switchToHttp().getRequest()
        console.log('account=>',account)
        // return false  
        return requiredRoles.some(role => account.roles.split(',').includes(role))
    }
         
}


