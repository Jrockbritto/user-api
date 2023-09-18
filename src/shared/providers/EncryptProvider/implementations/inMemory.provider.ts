import { IEncryptProvider } from '../encryptProvider.interface';

export class InMemoryEncrypt implements IEncryptProvider {
  async compareHash(password: string, hash: string): Promise<boolean> {
    return password === hash;
  }
  async generateHash(text: string): Promise<string> {
    return text;
  }
}
