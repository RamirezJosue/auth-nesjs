import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';
import { AuthService } from '../auth.service';
import { RegisterAuthDto } from '../dto/register-auth.dto';

@Injectable()
export class FacebookOauthStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    private readonly authService: AuthService
  ) {
    super({
      clientID: '3293935274176278',
      clientSecret: '47820f03be5dfb289dc587dffab190cf',
      callbackURL: "http://localhost:3000/api/auth/facebook/redirect",
      scope: "email",
      profileFields: ['emails', 'name', 'photos'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void
  ): Promise<any> {
    const { id, name, emails, provider, photos } = profile;
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
  }
}