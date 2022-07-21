import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-twitter';
import { AuthService } from '../auth.service';
import { RegisterAuthDto } from '../dto/register-auth.dto';

@Injectable()
export class TwitterOauthStrategy extends PassportStrategy(Strategy, 'twitter') {

    constructor(
        private readonly authService: AuthService
    ) {
        super({
            consumerKey: 'T5VzV7vX4bJwWsOBMCKlxgTfT',
            consumerSecret: 'SqWEnyE0Kx4anZ2XMa3OOsYqAlXTknd1hee0zGJkJsKgc3AO0D',
            callbackURL: 'http://localhost:3000/api/auth/twitter/redirect',
            includeEmail: true
        });
    }
    async validate(accessToken: string, refreshToken: string, profile: Profile, done: any): Promise<any> {
        const { id, displayName, photos, emails, provider } = profile;
        let user = await this.authService.findOne({ email: emails[0].value });
        const data: RegisterAuthDto = {
            email: emails[0].value,
            password: ":)",
            firstName: displayName,
            lastName: '',
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