import { IsEmpty } from "class-validator";

export class CreateRoomDto{
    @IsEmpty()
    id:string;
    @IsEmpty()
    name:string;
    password?:string;

}