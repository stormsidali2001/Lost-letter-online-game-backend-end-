import { Module } from "@nestjs/common";
import { UserRepository } from "src/user/user.repository";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";


@Module({
    controllers:[UserController],
    providers:[UserService]

})
export class UserModule {}