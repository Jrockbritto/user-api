import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IRenewTokenDTO } from '@modules/authentication/dto/iRenewToken.interface';
import {
  Token,
  TokenDocument,
} from '@modules/authentication/schemas/token.schema';

import { ITokenRepository } from '../token.interface';

@Injectable()
export class TokenRepository implements ITokenRepository {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
  ) {}

  findByUserId(userId: string): Promise<Token | null> {
    return this.tokenModel.findOne({ userId }).exec();
  }
  async renew({ token, userId }: IRenewTokenDTO): Promise<Token | undefined> {
    const oldToken = await this.tokenModel.findOne({ userId }).exec();
    if (oldToken) {
      oldToken.token = token;
      return oldToken.save();
    }
  }
  async destroy(userId: string): Promise<void> {
    await this.tokenModel.deleteOne({ userId }).exec();
  }
  async save(data: Token): Promise<Token> {
    const token = await this.tokenModel.create(data);
    return token.save();
  }
}
