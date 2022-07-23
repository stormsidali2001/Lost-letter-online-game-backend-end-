import { Body, Controller, Post } from "@nestjs/common";
import { Public } from "src/decorators/public-decorator";
import { CreateRoomDto } from "./room.dto";
import { RoomsService } from "./rooms.service";


@Controller("rooms")
export class RoomsController {
    constructor(
        private readonly roomService: RoomsService
    ) { }

    @Public() //temporary solution
    @Post('create')
    async createRoom(@Body() data:CreateRoomDto){
        return this.roomService.createRoom(data);
    }
    
    @Post('join')
    async joinRoom(){
        
    }

    @Post('rejoin')
    async rejoinRoom(){
        
    }

    //test
    @Public() //temporary solution
    @Post('get-room')
    async getRoom(@Body('id') id:string){
        return this.roomService.getRoom(id);
    }
}