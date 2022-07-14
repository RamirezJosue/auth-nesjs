import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { enviroments } from './enviroments';
import { UsersModule } from './users/users.module';
import config from './config';
import * as Joi from 'joi';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => ({
        uri: configService.dbCnnString
      })
    }),
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        DB_CNN_STRING: Joi.string().required(),
        JWT_KEY: Joi.string().required(),
        RT_KEY: Joi.string().required()
      })
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
