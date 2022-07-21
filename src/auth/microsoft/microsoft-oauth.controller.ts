import { Controller, Get, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from '../auth.service';
import { MicrosoftOauthGuard } from './microsoft-oauth.guard';

@Controller('auth/microsoft')
export class MicrosoftOauthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Get()
  @UseGuards(MicrosoftOauthGuard)
  async microsoftAuth(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('redirect')
  @UseGuards(MicrosoftOauthGuard)
  async microsoftAuthRedirect(
    @Req() req: Request, 
    @Res({ passthrough: true }) res: Response
  ): Promise<any> {
    const { user } = <any>req;
    await this.authService.login(user, res);
    return res.redirect('http://localhost:4200/dashboard');
  }
}