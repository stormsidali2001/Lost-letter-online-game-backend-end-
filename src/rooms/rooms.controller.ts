import { Controller, Post } from "@nestjs/common";


@Controller("rooms")
export class RoomsController {
    constructor() { }

    @Post('create')
    async createRoom(){

    }

    @Post('join')
    async joinRoom(){
        
    }

    @Post('rejoin')
    async rejoinRoom(){
        
    }
}