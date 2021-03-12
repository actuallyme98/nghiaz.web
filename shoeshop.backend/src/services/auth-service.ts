import { TokenHelper, EncryptHelper } from '../helpers';

// services
import userService from './user-service';
import { getEnv } from '../base/env-config';

// types
import { User } from '../models';
import { TokenPayload, APIRequest } from '../interfaces';
import { GUser } from '../transforms';

export class AuthService {
  async login(phoneNumber: string, password: string) {
    const user = await userService.findOneByPhone(phoneNumber);
    if (!user) {
      throw new Error('Người dùng không tồn tại');
    }
    if (!EncryptHelper.compare(password, user.password)) {
      throw new Error('Sai mật khẩu');
    }
    return await this.generatedAccessToken(user);
  }

  async verifyRefreshToken(refreshToken: string) {
    try {
      const tokenObject = await TokenHelper.verify<TokenPayload>(
        refreshToken,
        `refresh_${getEnv('JWT_SECRET')}`,
      );
      if (!tokenObject || !tokenObject.user_id) {
        throw new Error('Invalid token');
      }
      const user = await userService.findOneById(tokenObject.user_id);
      if (!user) {
        throw new Error('Invalid token');
      }
      // no error, generated new access token
      return this.generatedAccessToken(user, refreshToken);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new Error('Token expired');
      }
      throw new Error('Invalid token');
    }
  }

  async generatedAccessToken(user: GUser, refresh_token = '') {
    const tokenObj = await TokenHelper.generate(
      {
        user_id: user.id,
      },
      getEnv('JWT_SECRET'),
      getEnv('TOKEN_EXPIRES'),
    );
    const refreshTokenObj = await TokenHelper.generate(
      {
        user_id: user.id,
      },
      `refresh_${getEnv('JWT_SECRET')}`,
      getEnv('REFRESH_TOKEN_EXPIRES'),
    );

    return {
      token: tokenObj.token,
      expires: tokenObj.expires, // convert from seconds to miliseconds
      refresh_token: refresh_token.length > 0 ? refresh_token : refreshTokenObj.token,
      user: {
        client: user.client,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }

  async verifyUser(token: string) {
    try {
      const tokenObject = await TokenHelper.verify<TokenPayload>(token, getEnv('JWT_SECRET'));
      if (!tokenObject || !tokenObject.user_id) {
        throw new Error('Invalid token');
      }
      const user = await userService.findOneById(tokenObject.user_id);
      if (!user) {
        throw new Error('Invalid token');
      }
      return {
        client: user.client,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new Error('Token expired');
      }
      throw new Error('Invalid token');
    }
  }

  async validateRequest(req: APIRequest): Promise<User | any> {
    const authorization = req.headers.authorization
      ? req.headers.authorization
      : String(req.cookies.JWT);
    const authHeaders = (authorization as string).split(' ');
    if (authHeaders.length == 2 && authHeaders[0] == 'Bearer' && authHeaders[1] != '') {
      return await this.verifyUser(authHeaders[1]);
    } else {
      throw new Error('Unauthorized');
    }
  }
}

export default new AuthService();
