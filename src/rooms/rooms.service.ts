import { Injectable } from "@nestjs/common";
import { CreateRoomDto } from "./room.dto";
import { RoomsRepository } from "./rooms.repository";


@Injectable()
export class RoomsService {
    getRoom(id: string) {
        return this.roomsRepository.getRoom(id);
    }
    constructor(private readonly roomsRepository:RoomsRepository){

    }
    createRoom(data: CreateRoomDto) {
        return this.roomsRepository.createRoom(data);
    }
   
}