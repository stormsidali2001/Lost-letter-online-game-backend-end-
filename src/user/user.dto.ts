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

export class refreshTokenDTO{
    refresh_token:string;
    userId:string;
    constructor(refresh_token){
        this.refresh_token = refresh_token;
    }
}