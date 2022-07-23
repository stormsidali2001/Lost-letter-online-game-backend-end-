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
        const {name,password,id} = data;
        const initialRoom = {
            name,
            password,
        };
        this.logger.log(
            `Creating new room: ${JSON.stringify(initialRoom)} with TTL ${
              this.ttl
            } ...`,
          );
          
          const key = `room:${id}`;
          try{
               await this.redisClient
              .multi([
                    ['send_command', 'JSON.SET', key, '.', JSON.stringify(initialRoom)],
                    ['expire', key, this.ttl],
              ])
              .exec();

          }catch(e){
            this.logger.error(
                `Failed to create room ${JSON.stringify(initialRoom)}\n${e}`,
              );
              throw new InternalServerErrorException();
          }
    }
   
}