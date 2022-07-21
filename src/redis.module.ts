import { DynamicModule, Module } from "@nestjs/common";
import IoRedis from 'ioredis';

@Module({

})
export class RedisModule {
    static async registerAsync():Promise<DynamicModule>{
        return {
            module: RedisModule,
            imports: [],
            providers: [],
            exports: [],
        }
    }
}