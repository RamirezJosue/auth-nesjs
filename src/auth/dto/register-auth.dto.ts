import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { LoginAuthDto } from './login-auth.dto';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    role: string;
    picture: string;
    providers: any;
}