import { Mssql } from '../base';

// modals
import { Client, EnumGender } from '../models';

// helpers
import { ErrorHelper } from '../helpers';

// transform
import { toGClient } from '../transforms';

export class ClientService {
  public async findOneByUserId(userId: number): Promise<Client | undefined> {
    try {
      const result = await Mssql.Find('client', 'users_id', userId);
      if (!result) {
        return;
      }
      return toGClient(result);
    } catch (err) {
      ErrorHelper.BadRequestException(err);
    }
  }
  public async findOneById(id: number): Promise<any> {
    try {
      return await Mssql.Find('client', 'id', id);
    } catch (err) {
      ErrorHelper.BadRequestException(err);
    }
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
}

export default new ClientService();
