import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IRenewTokenDTO } from '@modules/authentication/dto/iRenewToken.interface';
import {
  RefreshToken,
  RefreshTokenDocument,
} from '@modules/authentication/schemas/refreshToken.schema';

import { IRefreshTokenRepository } from '../refreshToken.interface';

@Injectable()
export class RefreshTokenRepository implements IRefreshTokenRepository {
  constructor(
    @InjectModel(RefreshToken.name)
    private refreshTokenModel: Model<RefreshTokenDocument>,
  ) {}

  findByUserId(userId: string): Promise<RefreshToken | null> {
    return this.refreshTokenModel.findOne({ userId }).exec();
  }
  async renew({
    token,
    userId,
  }: IRenewTokenDTO): Promise<RefreshToken | undefined> {
    const oldToken = await this.refreshTokenModel.findOne({ userId }).exec();
    if (oldToken) {
      oldToken.token = token;
      return oldToken.save();
    }
  }
  async destroy(userId: string): Promise<void> {
    await this.refreshTokenModel.deleteOne({ userId }).exec();
  }
  async save(data: RefreshToken): Promise<RefreshToken> {
    const token = await this.refreshTokenModel.create(data);
    return token.save();
  }
}
