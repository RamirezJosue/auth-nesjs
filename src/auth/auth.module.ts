import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FacebookOauthController } from './facebook/facebook-oauth.controller';
import { FacebookOauthStrategy } from './facebook/facebook-oauth.strategy';
import { GoogleOauthController } from './google/google-oauth.controller';
import { GoogleOauthStrategy  } from './google/google-oauth.strategy';
import { MicrosoftOauthController } from './microsoft/microsoft-oauth.controller';
import { MicrosoftOauthStrategy } from './microsoft/microsoft-oauth.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { TwitterOauthController } from './twitter/twitter-oauth.controller';
import { TwitterOauthStrategy } from './twitter/twitter-oauth.strategy';

@Module({
    imports: [
        UsersModule,
        JwtModule.register({})
    ],
    controllers: [
        AuthController,
        GoogleOauthController,
        FacebookOauthController,
        MicrosoftOauthController,
        TwitterOauthController
    ],
    providers: [
        AuthService,
        JwtStrategy,
        LocalStrategy,
        RefreshTokenStrategy,
        GoogleOauthStrategy,
        FacebookOauthStrategy,
        MicrosoftOauthStrategy,
        TwitterOauthStrategy 
    ]
})
export class AuthModule { }
