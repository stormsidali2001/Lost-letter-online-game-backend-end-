import { Body, Controller, Get, Post,Request, UseGuards } from "@nestjs/common";
import { getCurrentUserId } from "src/decorators/get-current-user-id.decorator";
import { getCurrentUser } from "src/decorators/get-current-user.decorator";
import { Public } from "src/decorators/public-decorator";
import { RefrechTokenGuard } from "src/guards/refresh-token.guard";
import { LoginUserDto, refreshTokenDTO } from "./user.dto";
import { UserService } from "./user.service";


@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Public()
    @Post('signup')
    async signup(@Body() createUserDto) {
        return this.userService.signup(createUserDto);
    }

    @Public()
    @Post('signin')
    async signin(credentials: LoginUserDto) {
        return this.userService.signin(credentials);
    }
    @Public()
    @UseGuards(RefrechTokenGuard)
    @Post("refresh-token")
    async refreshToken( 
        @getCurrentUserId() userId: string,
        @getCurrentUser('refresh_token') refreshToken: string,){
        return this.userService.refreshToken(userId,refreshToken);
    }

}