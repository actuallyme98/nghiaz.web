import { Controller, Get, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthService } from '@api/services';
import { APIRequest } from '~/modules/api/interfaces';
import { classToPlain } from 'class-transformer';
@ApiBearerAuth()
@ApiTags('admin')
@Controller()
export class AdminController {
  constructor(private authService: AuthService) {}
  @Get('/auth/me')
  async profile(@Req() req: APIRequest) {
    return classToPlain((req as any).user);
  }
}
