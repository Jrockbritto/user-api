import { IRenewTokenDTO } from '../dto/iRenewToken.interface';
import { Token } from '../schemas/token.schema';

export interface IRefreshTokenRepository {
  findByUserId(userId: string): Promise<Token | null>;
  save(token: Token): Promise<Token>;
  renew({ token, userId }: IRenewTokenDTO): Promise<Token | undefined>;
  destroy(userId: string): Promise<void>;
}
