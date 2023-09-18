import * as bcrypt from 'bcryptjs';

import { IEncryptProvider } from '../encryptProvider.interface';

export class BcryptProvider implements IEncryptProvider {
  compareHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
  async generateHash(text: string): Promise<string> {
    return bcrypt.hash(text, 10);
  }
}
