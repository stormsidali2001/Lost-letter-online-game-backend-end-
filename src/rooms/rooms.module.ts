import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import {  jwtModule, redisModule } from "src/modules.config";
import { RoomsController } from "./rooms.controller";
import { RoomsGateWay } from "./rooms.gateway";
import { RoomsRepository } from "./rooms.repository";
import { RoomsService } from "./rooms.service";


@Module({
    imports:[ConfigModule,redisModule,jwtModule],
    controllers:[RoomsController],
    providers:[RoomsService,RoomsRepository,RoomsGateWay],
})
export class RoomsModule {
}
