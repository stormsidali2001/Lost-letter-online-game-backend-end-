import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model ,FilterQuery} from "mongoose";
import { User, UserDocument } from "./user.schema";


@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>
    ) {}
    async findOne(userFilterQuery:FilterQuery<User>){
        return await this.userModel.findOne(userFilterQuery);
    }
    async find(userFilterQuery:FilterQuery<User>){
        return await this.userModel.find(userFilterQuery);
    }
    async create(user: User) {
        const newUser =  await this.userModel.create(user);
        return await newUser.save();
    }
    async findOneAndUpdate(userFilterQuery:FilterQuery<User>,userUpdate:Partial<User>){
        return await this.userModel.findOneAndUpdate(userFilterQuery,userUpdate);
    }
    
}