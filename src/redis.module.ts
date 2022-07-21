import { DynamicModule, FactoryProvider, Module, ModuleMetadata } from "@nestjs/common";
import IoRedis, { Redis, RedisOptions } from 'ioredis';
export const IoRedisKey = 'IoRedis';

type RedisModuleOptions = {
    connectionOptions:RedisOptions;
    onClientReady?:(client:Redis)=>void;
}
type RedisAsyncModuleOptions = {
    useFactory:(
        ...args:any[]
    )=>Promise<RedisModuleOptions> | RedisModuleOptions ;
} & Pick<ModuleMetadata, 'imports'>
  & Pick<FactoryProvider, 'inject'>;
@Module({

})
export class RedisModule {
    static async registerAsync(
        {
            useFactory,
            inject,
            imports,
        } :RedisAsyncModuleOptions

    ):Promise<DynamicModule>{
        const redisProvider = {
            provide:IoRedisKey,
            useFactory:async(...args)=>{
                const { connectionOptions, onClientReady} = await useFactory(...args);
                const client = await new IoRedis(connectionOptions);
                onClientReady(client);
                return client;
            },
            inject,
        }
        return {
            module: RedisModule,
            imports,
            providers: [
                redisProvider
            ],
            exports:[redisProvider]

        }
    }
}