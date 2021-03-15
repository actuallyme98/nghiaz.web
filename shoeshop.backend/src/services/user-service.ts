import { Mssql } from '../base';
import moment from 'moment';

// modals
import { User } from '../models';

// services
import ClientService from './client-service';

// helpers
import { EncryptHelper } from '../helpers';

// transform
import { toGUser, GUser } from '../transforms';

// dtos
import { UpdateInfoArgs, UpdatePasswordArgs } from '../dtos';

export class UserService {
  public async findOneByPhone(phoneNumber: string): Promise<GUser | undefined> {
    const result = await Mssql.Find('users', 'username', phoneNumber);
    if (!result) {
      return;
    }
    return toGUser(result);
  }
  public async findOneById(id: number): Promise<GUser | undefined> {
    const result = await Mssql.Find('users', 'id', id);
    if (!result) {
      return;
    }
    return toGUser(result);
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
        password: EncryptHelper.hash(args.password),
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

  public async updateInfo(args: UpdateInfoArgs) {
    try {
      const argsUpdated = [
        { col: 'username', value: args.phoneNumber },
        { col: 'email', value: args.email },
        { col: 'first_name', value: args.firstName },
        { col: 'last_name', value: args.lastName },
        { col: 'updated_at', value: moment().format('YYYY-MM-DD HH:mm') },
      ];
      // update user table
      await Mssql.Update('users', { col: 'id', value: args.userId }, argsUpdated);
    } catch (err) {
      throw new Error(err);
    }

    const argsUpdated = [
      { col: 'gender', value: args.gender },
      { col: 'dob', value: args.dob },
    ];
    // update client table
    await Mssql.Update('client', { col: 'users_id', value: args.userId }, argsUpdated);
  }

  public async updatePassword(args: UpdatePasswordArgs) {
    let user: GUser | undefined;
    try {
      user = await this.findOneById(args.userId);
    } catch (err) {
      throw new Error(err);
    }
    if (!user) {
      throw new Error('Unauthorized');
    }
    if (!EncryptHelper.compare(args.oldPassword, user.password)) {
      throw new Error('Sai mật khẩu');
    }
    if (EncryptHelper.compare(args.newPassword, user.password)) {
      throw new Error('Mật khẩu trùng với mật khẩu cũ');
    }
    const argsUpdated = [
      { col: 'password', value: EncryptHelper.hash(args.newPassword) },
      { col: 'updated_at', value: moment().format('YYYY-MM-DD HH:mm') },
    ];
    await Mssql.Update('users', { col: 'id', value: args.userId }, argsUpdated);
  }
}

export default new UserService();
