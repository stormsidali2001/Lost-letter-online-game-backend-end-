import { Body, Controller, Post } from "@nestjs/common";
import { getCurrentUserId } from "src/decorators/get-current-user-id.decorator";
import { Public } from "src/decorators/public-decorator";
import { CreateRoomDto } from "./room.dto";
import { RoomsService } from "./rooms.service";


@Controller("rooms")
export class RoomsController {
    constructor(
        private readonly roomService: RoomsService
    ) { }


    @Post('create')
    async createRoom(@getCurrentUserId() userId:string,@Body() data:CreateRoomDto){
        return this.roomService.createRoom(userId,data);
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