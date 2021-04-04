import {
  Controller,
  Post,
  Res,
  Body,
  Get,
  Query,
  Put,
  UseInterceptors,
  UploadedFile,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { Response } from 'express';

import {
  AuthValidateDTO,
  CreateBlogCategoryDTO,
  CreateBlogDTO,
  UpdateBlogCategoryDTO,
} from '@admin/dtos';

import { BlogService } from '@admin/services';
import { FileInterceptor } from '@nestjs/platform-express';
@ApiBearerAuth()
@ApiTags('blog')
@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get('/category/list')
  async listCategories(@Res() res: Response) {
    const data = await this.blogService.listBlogCategories();
    return res.json({ data });
  }

  @Post('/category/create')
  async createBlogCategory(@Body() payload: CreateBlogCategoryDTO, @Res() res: Response) {
    await this.blogService.createBlogCategory(payload);
    return res.json({ ok: true });
  }

  @Put('/category/update')
  async updateBlogCategory(@Body() payload: UpdateBlogCategoryDTO, @Res() res: Response) {
    await this.blogService.updateBlogCategory(payload);
    return res.json({ ok: true });
  }

  @Delete('/category/delete/:id')
  async deleteBlogCategory(@Param('id') id: number, @Res() res: Response) {
    await this.blogService.deleteBlogCategory(id);
    return res.json({ ok: true });
  }

  @Get('/list')
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  @ApiQuery({ name: 'limit', required: false, type: 'number' })
  @ApiQuery({ name: 'categoryId', required: false, type: 'number' })
  async listBlogs(
    @Res() res: Response,
    @Query('page') page = 1,
    @Query('limit') limit = 5,
    @Query('categoryId') categoryId: number,
  ) {
    limit = limit > 100 ? 100 : limit;
    const data = await this.blogService.findAll(
      {
        page,
        limit,
      },
      categoryId,
    );
    return res.json({ data });
  }

  @Post('/create')
  async createBlog(@Body() payload: CreateBlogDTO, @Res() res: Response) {
    const data = await this.blogService.createBlog(payload);
    return res.json({ data });
  }

  @Put('/thumbnail/update/:id')
  @UseInterceptors(FileInterceptor('thumbnail'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
    @Param('id') id: number,
  ) {
    await this.blogService.updateThumbnail(id, file.filename);
    return res.json({ ok: true });
  }

  @Delete('/delete/:id')
  async deleteBlog(@Param('id') id: number, @Res() res: Response) {
    await this.blogService.deleteBlog(id);
    return res.json({ ok: true });
  }
}
