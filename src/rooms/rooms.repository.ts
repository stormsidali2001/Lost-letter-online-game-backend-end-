import { Inject, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Redis from "ioredis";
import { IoRedisKey } from "src/redis.module";
import { CreateRoomDto } from "./room.dto";
import * as uniqid from "uniqid";


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
    async createRoom({name,creatorUserId}:CreateRoomDto){
        const initialRoom = {
            name,
            creatorUserId
        };
        this.logger.log(
            `Creating new room: ${JSON.stringify(initialRoom)} with TTL ${
              this.ttl
            } ...`,
          );
          
          const key = `room:${name}${uniqid()}`;
          try{

    
            await this.redisClient
           .call('SET', key, JSON.stringify(initialRoom), 'EX', this.ttl)
           this.logger.log(
            `Room created:  ${JSON.stringify(initialRoom)}\n$`,
          );
          return initialRoom;

          }catch(e){
            this.logger.error(
                `Failed to create room ${JSON.stringify(initialRoom)}\n${e}`,
              );
              throw new InternalServerErrorException();
          }
    }
    async getRoom(id:string){
        try{
            const key = `room:${id}`;
            const room = await this.redisClient.get(key);
            return JSON.parse(room);
        }catch(e){
            this.logger.error(
                `Error while getting room with id: ${id}\n${e}`,
              );
              throw new InternalServerErrorException();
        }
      
    }
   
}