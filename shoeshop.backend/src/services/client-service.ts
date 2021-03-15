import { Mssql } from '../base';

// modals
import { Client, EnumGender } from '../models';

// transform
import { toGClient, GClient } from '../transforms';

export class ClientService {
  public async findOneByUserId(userId: number): Promise<GClient | undefined> {
    const result = await Mssql.Find('client', 'users_id', userId);
    if (!result) {
      return;
    }
    return toGClient(result);
  }
  public async findOneById(id: number): Promise<any> {
    return await Mssql.Find('client', 'id', id);
  }
  public async createClient(args: Client): Promise<boolean> {
    try {
      const createClientArgs: Client = {
        userId: args.userId,
        gender: EnumGender.UNDEFINED,
        avatar: args.avatar || '',
        dob: args.dob || '',
      };
      await Mssql.Insert('client', createClientArgs);
      return true;
    } catch (err) {
      return false;
    }
  }
  public async updateAvatar(path: string, id?: number) {
    const argsUpdated = [{ col: 'avatar', value: path }];
    await Mssql.Update('client', { col: 'id', value: id }, argsUpdated);
  }
}

export default new ClientService();
