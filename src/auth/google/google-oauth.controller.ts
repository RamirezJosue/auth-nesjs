import { Controller, Get, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from '../auth.service';
import { GoogleOauthGuard } from './google-oauth.guard';

@Controller('auth/google')
export class GoogleOauthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Get()
  @UseGuards(GoogleOauthGuard)
  async googleAuth(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(
    @Req() req: Request, 
    @Res({ passthrough: true }) res: Response
  ): Promise<any> {
    const { user } = <any>req;
    await this.authService.login(user, res);
    return res.redirect('http://localhost:4200/dashboard');
  }
}