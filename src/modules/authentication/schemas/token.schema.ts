import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import env from '@config/env';

export type TokenDocument = HydratedDocument<Token>;

@Schema()
export class Token {
  @Prop()
  userId: string;

  @Prop()
  token: string;

  @Prop({ type: Date, expires: env().jwt.expiresIn, default: Date.now })
  createdAt?: Date;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
