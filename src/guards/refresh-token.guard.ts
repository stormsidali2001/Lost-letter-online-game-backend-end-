import { Injectable, Logger } from '@nestjs/common'
import {AuthGuard} from '@nestjs/passport'

//the guard is the responsible for calling the approperiate strategy
@Injectable()
export class RefrechTokenGuard extends AuthGuard('jwt-refrech'){
    private readonly logger = new Logger(RefrechTokenGuard.name);
    constructor(){
        super();
        this.logger.log("running....");
    }
}