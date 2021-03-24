import { Controller, Post, Body, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthResponseDTO, AuthValidateDTO, AuthRefreshTokenDTO, CreateUserDTO } from '@api/dtos';
import { AuthService, UserService } from '@api/services';
import { Response } from 'express';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private readonly userService: UserService) {}
  // Create a new jwt token
  @ApiResponse({
    status: 200,
    isArray: false,
    type: AuthResponseDTO,
  })
  @Post('token')
  async validate(@Body() payload: AuthValidateDTO, @Res() res: Response) {
    const loginData = await this.authService.login(payload.username, payload.password);
    res.cookie('JWT', 'Bearer ' + loginData.token, {
      maxAge: loginData.expires,
      httpOnly: true,
    });
    return res.json(loginData);
  }

  @ApiResponse({
    description: 'Refreshing Access Tokens',
    status: 200,
    isArray: false,
    type: AuthResponseDTO,
  })
  @Post('refresh_token')
  async token(@Body() payload: AuthRefreshTokenDTO) {
    return this.authService.verifyRefreshToken(payload.refresh_token);
  }

  @ApiResponse({
    status: 200,
  })
  @Post('/register')
  async createUser(@Res() res: Response, @Body() payload: CreateUserDTO) {
    await this.userService.create(payload);
    return res.json({ ok: true });
  }

  @ApiResponse({
    description: 'Sign out',
    status: 200,
  })
  @Post('logout')
  async signOut(@Res() res: Response) {
    res.clearCookie('JWT');
    return res.json({ ok: true });
  }
}
