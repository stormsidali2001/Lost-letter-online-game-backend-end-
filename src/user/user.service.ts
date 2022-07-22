import { Injectable } from "@nestjs/common";
import { FilterQuery } from "mongoose";
import { User } from "src/mongoose/user.schema";
import { createUserDto } from "./user.dto";
import { UserRepository } from "./user.repository";


@Injectable()
export class UserService{
    constructor(
        private readonly userRepository:UserRepository
    ){}

    async getUserById(id:string){
        return this.userRepository.findOne({_id:id});
    }
    async getUsers(){
        return this.userRepository.find({});
    }
    async findAndUpdate(userFilterQuery:FilterQuery<User>,userUpdate:Partial<User>){
        return await this.userRepository.findOneAndUpdate(userFilterQuery,userUpdate);
    }
    async signup(user:createUserDto){
        return await this.userRepository.create(user);
    }

}