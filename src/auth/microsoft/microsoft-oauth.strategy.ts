import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Strategy } from 'passport-microsoft';
import { RegisterAuthDto } from '../dto/register-auth.dto';

@Injectable()
export class MicrosoftOauthStrategy extends PassportStrategy(Strategy, 'microsoft') {
  constructor(
    private readonly authService: AuthService
  ) {
    super({
      clientID: 'a99c8fbd-3590-44af-86f5-afc60c272bb1',
      clientSecret: 'rsK8Q~uO93mtqjth-kt6e7PzX~ndlxune4na.baV',
      callbackURL: 'http://localhost:3000/api/auth/microsoft/redirect',
      scope: ['user.read']
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: any, done: any): Promise<any> {
    const { id, name, emails, provider } = profile;
    let user = await this.authService.findOne({ email: emails[0].value });
    const data: RegisterAuthDto = {
      email: emails[0].value,
      password: ":)",
      firstName: name.givenName,
      lastName: name.familyName,
      picture: '',
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