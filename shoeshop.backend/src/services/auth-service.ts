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
      this.checkToken(tokenObject);
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
      parseInt(getEnv('TOKEN_EXPIRES')),
    );
    const refreshTokenObj = await TokenHelper.generate(
      {
        user_id: user.id,
      },
      `refresh_${getEnv('JWT_SECRET')}`,
      parseInt(getEnv('REFRESH_TOKEN_EXPIRES')),
    );

    return {
      token: tokenObj.token,
      expires: tokenObj.expires * 1000, // convert from seconds to miliseconds
      refresh_token: refresh_token.length > 0 ? refresh_token : refreshTokenObj.token,
      user: {
        client: user.client,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }

  async verifyUser(token: string): Promise<User | any> {
    try {
      const tokenObject = await TokenHelper.verify<TokenPayload>(token, getEnv('JWT_SECRET'));
      await this.checkToken(tokenObject);
      const user = await userService.findOneById(tokenObject.user_id);
      this.checkUser(user);
      return user;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new Error('Token expired');
      }
      throw new Error('Invalid token');
    }
  }

  checkToken(tokenObject: TokenPayload) {
    if (!tokenObject || !tokenObject.user_id) {
      throw new Error('Invalid token');
    }
  }

  checkUser(user?: User) {
    if (!user) {
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
      console.log('Unauthorized');
    }
  }

  async register(email: string, password: string) {
    // register
    return true;
  }
}

export default new AuthService();
