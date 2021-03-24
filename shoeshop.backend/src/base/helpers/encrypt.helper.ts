import Sha512 from '../hashing/sha512';
export class EncryptHelper {
  static hash(str: string) {
    return Sha512.hash(str);
  }
  static compare(str: string, hash: string) {
    return this.hash(str) === hash;
  }
}
