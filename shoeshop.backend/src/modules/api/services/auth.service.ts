import { Injectable, Inject } from '@nestjs/common';
import { User } from '@api/entities';
import { TokenHelper, ErrorHelper, EncryptHelper } from '@base/helpers';
import { UserService, MailService } from '@api/services';
import { UserStatusType } from '@api/entities/user.entity';
import { TokenPayload } from '@api/interfaces';
import { ConfigService } from '@nestjs/config';
import { APIRequest } from '@api/interfaces';
import { classToPlain } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserService')
    private userService: UserService,
    private configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject('MailService')
    private readonly mailService: MailService,
  ) {}

  async login(email: string, password: string) {
    // find user
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      ErrorHelper.BadRequestException('User does not exist');
    }
    if (user.status === UserStatusType.INACTIVE) {
      ErrorHelper.BadRequestException('Please verify this account in your mail');
    }
    if (!(await EncryptHelper.compare(password, user.password))) {
      ErrorHelper.BadRequestException('Password was wrong');
    }
    return await this.generatedAccessToken(user);
  }

  async verifyRefreshToken(refreshToken: string) {
    try {
      const tokenObject = await TokenHelper.verify<TokenPayload>(
        refreshToken,
        `refresh_${this.configService.get('app.auth.secret')}`,
      );
      await this.checkToken(tokenObject);
      const user = await this.userService.findOneById(tokenObject.user_id);
      this.checkUser(user);
      // no error, generated new access token
      return this.generatedAccessToken(user, refreshToken);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        ErrorHelper.BadRequestException('Token expired');
      }
      ErrorHelper.UnauthorizedException('Invalid token');
    }
  }

  async generatedAccessToken(user: User, refresh_token = '') {
    const tokenObj = await TokenHelper.generate(
      {
        user_id: user.id,
      },
      this.configService.get('app.auth.secret'),
      parseInt(this.configService.get('app.auth.tokenExpires')),
    );
    const refreshTokenObj = await TokenHelper.generate(
      {
        user_id: user.id,
      },
      `refresh_${this.configService.get('app.auth.secret')}`,
      this.configService.get('app.auth.refreshTokenExpires'),
    );

    return {
      token: tokenObj.token,
      expires: tokenObj.expires * 1000, // convert from seconds to miliseconds
      refresh_token: refresh_token.length > 0 ? refresh_token : refreshTokenObj.token,
      user: classToPlain(user),
    };
  }

  async verifyUser(token: string): Promise<User> {
    try {
      const tokenObject = await TokenHelper.verify<TokenPayload>(
        token,
        this.configService.get('app.auth.secret'),
      );
      await this.checkToken(tokenObject);
      const user = await this.userService.findOneById(tokenObject.user_id);
      this.checkUser(user);
      return user;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        ErrorHelper.BadRequestException('Token expired');
      }
      ErrorHelper.UnauthorizedException('Invalid token');
    }
  }

  checkToken(tokenObject: TokenPayload) {
    if (!tokenObject || !tokenObject.user_id) {
      ErrorHelper.UnauthorizedException('Invalid token');
    }
  }

  checkUser(user: User) {
    if (!user) {
      ErrorHelper.BadRequestException('Invalid token');
    }
  }

  async validateRequest(req: APIRequest): Promise<User> {
    const authorization = req.headers.authorization
      ? req.headers.authorization
      : String(req.cookies.JWT);
    const authHeaders = (authorization as string).split(' ');
    if (authHeaders.length == 2 && authHeaders[0] == 'Bearer' && authHeaders[1] != '') {
      return await this.verifyUser(authHeaders[1]);
    } else {
      ErrorHelper.UnauthorizedException('Unauthorized');
    }
  }
}
