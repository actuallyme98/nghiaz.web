import Sha512 from '../base/sha512';

export class EncryptHelper {
  public hash(str: string) {
    return Sha512.hash(str);
  }
  public compare(str: string, hash: string) {
    return this.hash(str) === hash;
  }
}

export default new EncryptHelper();
