import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import config from '../../config';
import { ConfigType } from '@nestjs/config';
import { JwtPayload } from '../types';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(config.KEY) configService: ConfigType<typeof config>
  ) {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => req?.cookies?.access_token]),
      ignoreExpiration: false,
      secretOrKey: configService.jtwKey,
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}