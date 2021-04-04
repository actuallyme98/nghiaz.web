import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { BlogService } from '@api/services';
import { Response } from 'express';

@ApiBearerAuth()
@ApiTags('blog')
@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get('/category/list')
  async listCategories(@Res() res: Response) {
    const data = await this.blogService.listCategories();
    return res.json({ data });
  }
}
