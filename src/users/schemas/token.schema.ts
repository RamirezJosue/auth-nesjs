import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type TokenDocument = Token & Document;

@Schema({
    timestamps: true,
    versionKey: false
})
export class Token {
    @Prop({type: Date})
    expiration: Date

    @Prop({type: String})
    token: string

    @Prop({ type: SchemaTypes.ObjectId, ref: 'User'  })
    user: string;    
}

export const TokenSchema = SchemaFactory.createForClass(Token);      