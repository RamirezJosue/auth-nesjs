import { Controller, Get, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from '../auth.service';
import { FacebookOauthGuard } from './facebook-oauth.guard';

@Controller('auth/facebook')
export class FacebookOauthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Get()
  @UseGuards(FacebookOauthGuard)
  async faceboookAuth(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('redirect')
  @UseGuards(FacebookOauthGuard)
  async faceboookAuthRedirect(
    @Req() req: Request, 
    @Res({ passthrough: true }) res: Response
  ): Promise<any> {
    const { user } = <any>req;
    await this.authService.login(user, res);
    return res.redirect('http://localhost:4200/dashboard');
  }
}