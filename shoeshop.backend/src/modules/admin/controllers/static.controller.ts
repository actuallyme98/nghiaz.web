import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import * as fs from 'fs';

@ApiBearerAuth()
@ApiTags('static')
@Controller('static')
export class StaticController {
  @ApiResponse({
    status: 200,
  })
  @Get('/:url')
  async getAvatarUrl(@Param('url') url: string, @Res() res: Response) {
    const img = fs.readFileSync('upload/assets/' + url);

    res.contentType('image/jpeg');
    res.send(img);
  }
}
