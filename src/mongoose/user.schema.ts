import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = User & Document;

@Schema()
export class User{
    @Prop({required:true})
    fullname:string;
    
    @Prop({required:true,unique:true})
    email:string;
    
    @Prop({required:true})
    password:string;
    
    @Prop({default:new Date()})
    createdAt:Date;

    @Prop({default:new Date()})
    updatedAt:Date;

    @Prop({default:null,required:false})
    refreshTokenHash:string;
}
export const UserSchema = SchemaFactory.createForClass(User);