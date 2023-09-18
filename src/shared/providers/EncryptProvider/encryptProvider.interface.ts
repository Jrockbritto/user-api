export interface IEncryptProvider {
  compareHash(password: string, hash: string): Promise<boolean>;
  generateHash(text: string): Promise<string>;
}
