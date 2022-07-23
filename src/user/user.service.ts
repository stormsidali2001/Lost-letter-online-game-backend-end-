import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { FilterQuery } from "mongoose";
import { User } from "src/mongoose/user.schema";
import { createUserDto, LoginUserDto } from "./user.dto";
import { UserRepository } from "./user.repository";
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UserService{
    private readonly logger = new Logger(UserService.name);
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
        try{
            const userDb = await this.userRepository.findOne({email:user.email});
            if(userDb){
                this.logger.error("user already exists");
                throw new UnauthorizedException("User already exists");
            }
            user.password = await bcrypt.hash(user.password,10);
            return await this.userRepository.create(user);
        }catch(e){
            this.logger.log(e);
            throw new UnauthorizedException("Invalid credentials");
        }
        
    }
    async signin(credentials:LoginUserDto){
        const {email,password} = credentials;
        try{
            const user = await this.userRepository.findOne({email});
            if(!user){
                this.logger.error("wrong email");
                throw new UnauthorizedException("Invalid credentials");
            }
            const equal:boolean = await bcrypt.compare(password,user.password);
            if(!equal){
                this.logger.error("wrong password");
                throw new UnauthorizedException("Invalid credentials");
            }
            const  {password:ps,...res} = user;            
            return res;
        }catch(e){
            this.logger.log(e);
            throw new UnauthorizedException("Invalid credentials");
        }
    }

    

}