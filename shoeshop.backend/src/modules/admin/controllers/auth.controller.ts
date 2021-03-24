import { Controller, Post, Res, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

import { AuthValidateDTO } from '@admin/dtos';

import { AuthService } from '@api/services';
@ApiBearerAuth()
@ApiTags('admin')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({
    status: 200,
  })
  @Post('/auth/token')
  async validate(@Body() payload: AuthValidateDTO, @Res() res: Response) {
    const loginData = await this.authService.login(payload.username, payload.password);
    res.cookie('JWT', 'Bearer ' + loginData.token, {
      maxAge: loginData.expires,
      httpOnly: true,
    });
    return res.json(loginData);
  }
}
