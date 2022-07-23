import { ConfigService } from '@nestjs/config';
import {Strategy,ExtractJwt} from 'passport-jwt'
import {PassportStrategy} from '@nestjs/passport'
import { Request } from 'express';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtPayload } from 'src/user/types/jwtPayload.type';
@Injectable()
export class RefrechTokenStrategy extends PassportStrategy(Strategy,'jwt-refrech'){
    private readonly logger = new Logger(RefrechTokenStrategy.name);
    constructor(config:ConfigService){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:config.get<string>('REFRECH_TOKEN_SECRET'),
            passReqToCallback:true  // this is to pass the request to the validate function
        })
        this.logger.log("running...")
    }
    validate(request:Request,payload:JwtPayload){
        const refresh_token = request?.get('authorization')?.replace('Bearer','').trim();
        if(!refresh_token){
            Logger.error("authorization header is malformed");
            throw new HttpException("authorization header is malformed",HttpStatus.FORBIDDEN);
        }
        return {
            ...payload,
            refresh_token
        };
        /* this function will attach returned value to the request object request.user = { ...payload,
            refresh_token}
        */
    }
}