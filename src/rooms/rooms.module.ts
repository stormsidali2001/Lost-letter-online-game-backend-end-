import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { redisModule } from "src/modules.config";
import { RoomsController } from "./rooms.controller";
import { RoomsService } from "./rooms.service";


@Module({
    imports:[ConfigModule,redisModule],
    controllers:[RoomsController],
    providers:[RoomsService],
})
export class RoomsModule {
}