import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { UserDto } from 'src/users/dto/user.dto';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { RefreshTokenGuard } from './guards/refresh-token.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    
    @Post('register')
    registerUser(@Body() userObject: RegisterAuthDto) {
        return this.authService.register(userObject);
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response
    ) {
        const user = req.user as UserDto;
        return this.authService.login(user, res);
    }

    @Post('logout')
    logout(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response
    ) {
        const refreshToken = req.cookies['refresh_token'];
        return this.authService.logout(refreshToken, res);
    }

    @UseGuards(RefreshTokenGuard)
    @Post('refresh')
    refresh(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response
    ) {
        const refreshToken = req.cookies['refresh_token'];
        return this.authService.refresh(refreshToken, res);
    }
}
