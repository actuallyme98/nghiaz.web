import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { classToPlain } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { APIRequest } from '@api/interfaces';

import { UserService } from '@api/services/user.service';
import { UpdateInfoDTO, UpdatePasswordDTO } from '../dtos';
import { FileInterceptor } from '@nestjs/platform-express';

import { Response } from 'express';

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

  @ApiResponse({
    status: 200,
  })
  @Put('/update-info')
  async updateInfo(@Body() payload: UpdateInfoDTO, @Req() req: APIRequest) {
    return await this.userService.updateInfo(req.user.id, payload);
  }

  @Post('/update-avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: APIRequest,
    @Res() res: Response,
  ) {
    const { client } = req.user;
    await this.userService.updateAvatar(client.id, file.filename);
    return res.json({ ok: true });
  }

  @Put('/update-password')
  async updatePassword(@Body() payload: UpdatePasswordDTO, @Req() req: APIRequest) {
    const { id } = req.user;
    return await this.userService.updatePassword(id, payload);
  }
}
