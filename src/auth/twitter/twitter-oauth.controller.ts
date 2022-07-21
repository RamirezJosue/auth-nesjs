import { Controller, Get, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from '../auth.service';
import { TwitterOauthGuard } from './twitter-oauth.guard';

@Controller('auth/twitter')
export class TwitterOauthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Get()
  @UseGuards(TwitterOauthGuard)
  async twitterAuth(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('redirect')
  @UseGuards(TwitterOauthGuard)
  async twitterAuthRedirect(
    @Req() req: Request, 
    @Res({ passthrough: true }) res: Response
  ): Promise<any> {
    const { user } = <any>req;
    await this.authService.login(user, res);
    return res.redirect('http://localhost:4200/dashboard');
  }
}