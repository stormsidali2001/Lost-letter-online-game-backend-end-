export class createUserDto {
    fullname:string;
    email:string;
    password:string;
    createdAt:Date;
    updatedAt:Date;
}

export class LoginUserDto{
    email:string;
    password:string;
    constructor(email,password){
        this.email = email;
        this.password = password;
    }
}

