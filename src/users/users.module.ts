import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './schemas/token.schema';
import { Provider, ProviderSchema, User, UserSchema,  } from './schemas/users.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
          name: User.name,
          schema: UserSchema,
      },
      {
          name: Token.name,
          schema: TokenSchema
      },
      {
          name: Provider.name,
          schema: ProviderSchema
      }
  ]),
  ],
  exports: [MongooseModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
