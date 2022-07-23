import { IsDate, IsEmail, IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class createUserDto {
    @IsEmpty()
    fullname:string;

    @IsEmail()
    email:string;

    @IsEmpty()
    password:string;

    @IsDate()
    createdAt:Date;

    @IsDate()
    updatedAt:Date;
    
}

export class LoginUserDto{
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @IsString()
    password:string;
    constructor(email,password){
        this.email = email;
        this.password = password;
    }
}

