import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class UserDto {
    @IsNotEmpty()
    _id: string;
    
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    role: string;

    picture: string;
    
    provider: string;

    providerId: string
}