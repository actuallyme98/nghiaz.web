import { Controller, Post, Body, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import {
  AuthResponseDTO,
  AuthValidateDTO,
  AuthRefreshTokenDTO,
  ForgotPasswordDTO,
  ResetPasswordDTO,
  VerifyUserDTO,
} from '@api/dtos';
import { AuthService } from '@api/services';
import { Response } from 'express';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  // Create a new jwt token
  @ApiResponse({
    status: 200,
    isArray: false,
    type: AuthResponseDTO,
  })
  @Post('validate')
  async validate(@Body() payload: AuthValidateDTO, @Res() res: Response) {
    const loginData = await this.authService.login(payload.email, payload.password);
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
  @Post('token')
  async token(@Body() payload: AuthRefreshTokenDTO) {
    return this.authService.verifyRefreshToken(payload.refresh_token);
  }

  @ApiResponse({
    description: 'Register user',
    status: 200,
    isArray: false,
  })
  @Post('sign-up')
  async signUp(@Body() payload: AuthValidateDTO) {
    return this.authService.register(payload.email, payload.password);
  }

  @ApiResponse({
    description: 'Sign out',
    status: 200,
  })
  @Post('sign-out')
  async signOut(@Res() res: Response) {
    res.clearCookie('JWT');
    return res.json({ ok: true });
  }
}
