import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Redis from "ioredis";
import { IoRedisKey } from "src/redis.module";


@Injectable()
export class RoomsRepository{
    private readonly ttl:string;
    private readonly logger:Logger = new Logger(RoomsRepository.name);
    constructor(
        @Inject(IoRedisKey) private readonly redisClient:Redis,
        configService:ConfigService
    ){
        this.ttl = configService.get("ROOM_TTL");
    }
   
}