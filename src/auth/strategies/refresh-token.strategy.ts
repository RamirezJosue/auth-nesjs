import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import config from '../../config';
import { JwtPayload } from '../types';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(
        @Inject(config.KEY) configService: ConfigType<typeof config>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => req?.cookies?.refresh_token]),
            secretOrKey: configService.rtKey,
            passReqToCallback: true
        });
    }

    validate(req: Request ,payload: JwtPayload) {
        const refreshToken = req.cookies.refresh_token.trim();
        if (!refreshToken) throw new ForbiddenException('Token incorrecto');
        return {
            ...payload,
            refreshToken,
        };
    }
}