import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { mongooseModule } from "src/modules.config";
import { User, UserSchema } from "src/mongoose/user.schema";
import { AccessTokenStrategy } from "src/passport-strategies/acces-tokken.strategy";
import { RefrechTokenStrategy } from "src/passport-strategies/refrech-token.strategy";
import { UserRepository } from "src/user/user.repository";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";


@Module({
    imports:[mongooseModule,PassportModule,ConfigModule,JwtModule.register({}),MongooseModule.forFeature([{ name: User.name, schema: UserSchema }],)],
    controllers:[UserController],
    providers:[UserService,UserRepository,RefrechTokenStrategy,AccessTokenStrategy],

})
export class UserModule {}
