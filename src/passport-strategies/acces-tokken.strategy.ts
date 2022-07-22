import { ConfigService } from '@nestjs/config';
import {Strategy,ExtractJwt} from 'passport-jwt'
import {PassportStrategy} from '@nestjs/passport'
import { Injectable, Logger } from '@nestjs/common';
@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy,'jwt'){
    private readonly logger = new Logger(AccessTokenStrategy.name);
    constructor(config:ConfigService){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:config.get<string>('ACCESS_TOKEN_SECRET')
        })
        this.logger.log("running...")
    }
    validate(payload){
        return payload;
          /* this function will attach user to the request object request.user = payload
        */
    }
}