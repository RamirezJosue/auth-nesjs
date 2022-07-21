import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { RegisterAuthDto } from '../dto/register-auth.dto';

@Injectable()
export class GoogleOauthStrategy  extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly authService: AuthService
  ) {
    super({
      clientID: '38445382609-lmm1nqros1msr58lg8dp5qu81b31e75t.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/api/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback): Promise<any> {
    try {
      const { id, name, emails, photos, provider } = profile;

      let user = await this.authService.findOne({email: emails[0].value});
      const data: RegisterAuthDto = {
        email: emails[0].value,
        password: ":)",
        firstName: name.givenName,
        lastName: name.familyName,
        picture: photos[0].value,
        provider,
        role: 'USER',
        providerId: id
      };

      if (!user) {
       user = await this.authService.register(data);
      }
      
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
}