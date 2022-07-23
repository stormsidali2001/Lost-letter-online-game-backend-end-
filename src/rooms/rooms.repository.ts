import { Inject, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Redis from "ioredis";
import { IoRedisKey } from "src/redis.module";
import { CreateRoomDto } from "./room.dto";


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
    async createRoom(data:CreateRoomDto){
        const {name,id} = data;
        const initialRoom = {
           s:'SSSS'
           
        };
        this.logger.log(
            `Creating new room: ${JSON.stringify(initialRoom)} with TTL ${
              this.ttl
            } ...`,
          );
          
          const key = `room:${id}`;
          try{
            await this.redisClient
           .call('SET', key, JSON.stringify(initialRoom))
           
           

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