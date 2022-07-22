import { ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Reflector } from '@nestjs/core';

@Injectable()
export class AccesTokenGuard extends AuthGuard("jwt") {
    private readonly logger = new Logger(AccesTokenGuard.name);
    constructor(private reflector:Reflector){
        super();
        this.logger.log("running....");
    }
    canActivate(context: ExecutionContext){
        const isPublic = this.reflector.getAllAndOverride('isPublic',[
            context.getHandler(), // in the function
            context.getClass() // in the class (example :userController)
        ])
        if(isPublic) return true;
        return super.canActivate(context);
    }
}