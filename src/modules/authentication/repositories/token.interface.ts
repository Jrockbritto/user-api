import { Token } from '../schemas/token.schema';

export interface ITokenRepository {
  findByUserId(userId: string): Promise<Token | null>;
  save(token: Token): Promise<Token>;
  renew(token: string, userId: string): Promise<Token | undefined>;
  destroy(userId: string): Promise<void>;
}
