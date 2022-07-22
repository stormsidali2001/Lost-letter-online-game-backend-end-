import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import {  jwtModule, redisModule } from "src/modules.config";
import { User, UserSchema } from "src/mongoose/user.schema";
import { RoomsController } from "./rooms.controller";
import { RoomsGateWay } from "./rooms.gateway";
import { RoomsRepository } from "./rooms.repository";
import { RoomsService } from "./rooms.service";


@Module({
    imports:[ConfigModule,redisModule,jwtModule,],
    controllers:[RoomsController],
    providers:[RoomsService,RoomsRepository,RoomsGateWay],
})
export class RoomsModule {
}
