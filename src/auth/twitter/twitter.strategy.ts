import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-twitter';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {

    constructor() {
        super({
            consumerKey: 'T5VzV7vX4bJwWsOBMCKlxgTfT',
            consumerSecret: 'SqWEnyE0Kx4anZ2XMa3OOsYqAlXTknd1hee0zGJkJsKgc3AO0D',
            callbackURL: 'http://localhost:3000/api/auth/twitter/redirect',
            includeEmail: true
        });
    }
    async validate(accessToken: string, refreshToken: string, profile: Profile, done: any): Promise<any> {
        const { displayName, photos, emails, provider } = profile;
        const user = {
            email: emails[0].value,
            firstName: displayName,
            lastName: '',
            picture: photos[0].value,
            provider
          }
        done(null, user);
    }
}