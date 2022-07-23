import { IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class CreateRoomDto{
    @IsNotEmpty()
    @IsString()
    name:string;
    password?:string;
    @IsNotEmpty()
    @IsString()
    creatorUserId:string;

}