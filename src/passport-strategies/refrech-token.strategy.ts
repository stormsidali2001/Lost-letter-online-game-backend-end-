import { ConfigService } from '@nestjs/config';
import {Strategy,ExtractJwt} from 'passport-jwt'
import {PassportStrategy} from '@nestjs/passport'
import { Request } from 'express';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
@Injectable()
export class RefrechTokenStrategy extends PassportStrategy(Strategy,'jwt-refrech'){
    private readonly logger = new Logger(RefrechTokenStrategy.name);
    constructor(config:ConfigService){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:config.get<string>('REFRECH_TOKEN_SECRET'),
            passReqToCallback:true
        })
        this.logger.log("running...")
    }
    validate(request:Request,payload){
        const refrechToken = request?.get('authorization')?.replace('Bearer','').trim()
        if(!refrechToken){
            Logger.error("refresh token mal formated","RefrechTokenStrategy/validate");
            throw new HttpException("refresh token mal formated",HttpStatus.FORBIDDEN);
        }
        return {
            ...payload,
            refrechToken
        };
        /* this function will attach user to the request object request.user = { ...payload,
            refrechToken}
        */
    }
}