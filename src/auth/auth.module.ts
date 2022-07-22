import { Module } from "@nestjs/common";
import { jwtModule, mongooseModule } from "src/modules.config";
import { UserRepository } from "src/user/user.repository";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";


@Module({
    imports:[jwtModule,mongooseModule],
    controllers:[AuthController],
    providers:[AuthService],
})
export class AuthModule {}