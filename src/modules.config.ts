import { Logger } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import Redis from "ioredis";
import { RedisModule } from "./redis.module";

export const redisModule = RedisModule.registerAsync({
  imports:[ConfigModule],
  useFactory:async(configService:ConfigService)=>{
    const logger = new Logger("RedisModule");
    return{
        connectionOptions:{
            host:configService.get("REDIS_HOST"),
            port:configService.get("REDIS_PORT"),
        },
        onClientReady:(client:Redis)=>{
            logger.log(`Redis client ready`);
            client.on('error',err=>{
                logger.error("Redis Error: ",err);
            })
            client.on('connect', () => {
                logger.log(
                  `Connected to redis on ${client.options.host}:${client.options.port}`,
                );
            });
        },

       
    }

  },
  inject:[ConfigService],
})

export const jwtModule = JwtModule.registerAsync({
  imports:[ConfigModule],
  useFactory:async(configService:ConfigService)=>{

    return{
        secret:configService.get("JWT_SECRET"),
        signOptions:{
            expiresIn:configService.get("ROOM_TTL"),
        },
    }
  },
  inject:[ConfigService],
})

export const mongooseModule = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    uri: configService.get<string>('MONGODB_URI'),
    
  }),
  inject: [ConfigService],
});