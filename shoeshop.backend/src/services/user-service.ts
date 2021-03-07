import { Mssql } from '../base';
import moment from 'moment';

// modals
import { User } from '../models';

// services
import ClientService from './client-service';

// helpers
import { ErrorHelper, EncryptHelper } from '../helpers';

// transform
import { toGUser } from '../transforms';

export class UserService {
  public async FindAllUser() {
    try {
      return await Mssql.FindAll('users');
    } catch (err) {
      ErrorHelper.BadRequestException(err);
    }
  }
  public async findOneByPhone(phoneNumber: string): Promise<any> {
    try {
      const result = await Mssql.Find('users', 'username', phoneNumber);
      if (!result) {
        return;
      }
      return toGUser(result);
    } catch (err) {
      ErrorHelper.BadRequestException(err);
    }
  }
  public async findOneById(id: string): Promise<any> {
    try {
      return await Mssql.Find('users', 'id', id);
    } catch (err) {
      ErrorHelper.BadRequestException(err);
    }
  }
  public async createUser(
    args: User,
  ): Promise<{
    status: boolean;
    message: string;
  }> {
    try {
      const user = await this.findOneByPhone(args.username);
      if (!!user) {
        return {
          status: false,
          message: 'Người dùng đã tồn tại',
        };
      }
    } catch (err) {
      return {
        status: false,
        message: 'Đăng ký thất bại, hãy thử lại.',
      };
    }

    try {
      const createUserArgs: User = {
        username: args.username,
        email: args.email || '',
        password: await EncryptHelper.hash(args.password),
        isSupperUser: !!args.isSupperUser ? 1 : 0,
        firstName: args.firstName,
        lastName: args.lastName,
        createdAt: moment().format('YYYY-MM-DD HH:mm'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm'),
      };
      const userId = await Mssql.Insert('users', createUserArgs);
      await ClientService.createClient({ userId });
      return {
        status: true,
        message: 'Đăng ký thành công, xin mời đăng nhập',
      };
    } catch (err) {
      return {
        status: false,
        message: 'Đăng ký thất bại, hãy thử lại.',
      };
    }
  }
}

export default new UserService();
