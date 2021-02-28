import { User } from '../models';
import { Mssql, ErrorHelper } from '../base';

export class UserService {
  public async FindAllUser() {
    try {
      return await Mssql.FindAll('users');
    } catch (err) {
      ErrorHelper.BadRequestException(err);
    }
  }
}

export default new UserService();
