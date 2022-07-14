import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/schemas/users.schema';
import { Model } from 'mongoose';
import { RegisterAuthDto } from './dto/register-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PayloadToken } from './interfaces/token.interface';
import { UserDto } from 'src/users/dto/user.dto';
import { Response } from 'express';
import config from './../config';
import { ConfigType } from '@nestjs/config';
import { JwtPayload, Tokens } from './types';
import { Token, TokenDocument } from 'src/users/schemas/token.schema';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        @InjectModel(Token.name) private readonly tokenModel: Model<TokenDocument>,
        @Inject(config.KEY) private configService: ConfigType<typeof config>,
        private jwtService: JwtService
    ) { }

    
    async validateUser(email: string, password: string) {
        const user = await this.userModel.findOne({email});
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const { password, ...result  } = user.toJSON();
                return result;
            }
        }
        return null;
    }

    async login(user: UserDto, res: Response) {
        const payload: JwtPayload = { uid: user._id };
        const { refresh_token, access_token } = await this.getTokens(payload);
        const expiration = new Date();
        expiration.setDate(expiration.getDate() + 7);
        await this.tokenModel.create({ token: refresh_token, expiration, user: user._id})
        res.status(200);
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 1 semana 
        });
        res.cookie('access_token', access_token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 1 semana 
        });
        return {
            access_token
        };
    }

    async getTokens(payload: PayloadToken): Promise<Tokens> {
        const [at, rt] = await Promise.all([
            this.jwtService.sign(payload, {
                secret: this.configService.jtwKey,
                expiresIn: '1h'
            }),
            this.jwtService.sign(payload, {
                secret: this.configService.rtKey,
                expiresIn: '7d'
            }),
        ]);
        return {
            access_token: at,
            refresh_token: rt
        }
    }

    async register(userObject: RegisterAuthDto) {
        const { password } = userObject;
        const plainToHash = bcrypt.hashSync(password, 10);
        userObject = { ...userObject, password: plainToHash};
        return this.userModel.create(userObject);
    }

    async logout(token: string, res: Response) {
        await this.tokenModel.deleteOne({token});
        res.clearCookie('refresh_token');
        res.clearCookie('access_token');
        return {
            message: 'success'
        }
    }

    async refresh(token: string, res: Response) {
        const { uid } = await this.jwtService.verify(token, {secret: this.configService.rtKey});
        const tokenEntity = await this.tokenModel.findOne({
            user: uid,
            expiration: { $gte: Date.now() }
        });

        if (!tokenEntity) {
            throw new UnauthorizedException();
        }
        const payload: JwtPayload = { uid };
        const access_token = await this.jwtService.sign(payload, {
            secret: this.configService.jtwKey,
            expiresIn: '1h'
        });
        res.cookie('access_token', access_token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 1 semana 
        });
        res.status(200);
        return {
            message: 'success'
        };
    }



  

}