import { Body, Controller, Get, Post,Request, UseGuards } from "@nestjs/common";
import { LoginUserDto } from "./user.dto";
import { UserService } from "./user.service";


@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Post('signup')
    async signup(@Body() createUserDto) {
        return this.userService.signup(createUserDto);
    }

    @Post('signin')
    async signin(credentials: LoginUserDto) {
        return this.userService.signin(credentials);
    }

}