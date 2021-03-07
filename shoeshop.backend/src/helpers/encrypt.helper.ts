import * as bcrypt from 'bcrypt';

export class EncryptHelper {
  public async hash(str: string, saltRounds = 10) {
    return await bcrypt.hash(str, saltRounds);
  }
  public compare(str: string, hash: string) {
    return bcrypt.compare(str, hash);
  }
}

export default new EncryptHelper();
