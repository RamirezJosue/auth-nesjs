import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class UserDto {
    @IsNotEmpty()
    _id: string;
    
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @MinLength(4)
    @MaxLength(12)
    password: string;

    role: string;
}