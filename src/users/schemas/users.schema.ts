import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProviderDocument = Provider & Document;
@Schema()
export class Provider {
    @Prop({})
    name: string;

    @Prop({})
    id: string;
}
export const ProviderSchema = SchemaFactory.createForClass(Provider);

export type UserDocument = User & Document;
@Schema()
export class User {

    @Prop({ required: true })
    firstName: string;

    @Prop()
    lastName: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    role: string;

    @Prop({ type: [ProviderSchema], default: [] })
    providers: Provider[]

    @Prop({})
    picture: string;
}

export const UserSchema = SchemaFactory.createForClass(User);