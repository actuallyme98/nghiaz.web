import { Controller, Get, Query, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { classToPlain } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { APIRequest } from '@api/interfaces';

import { UserService } from '@api/services/user.service';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private configService: ConfigService, private readonly userService: UserService) {}

  @ApiResponse({
    status: 200,
  })
  @Get('/profile')
  async profile(@Req() req: APIRequest) {
    return classToPlain((req as any).user);
  }
}
