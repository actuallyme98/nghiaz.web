import { Controller, Res, Get, Query, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiQuery } from '@nestjs/swagger';
import { BlogService } from '@api/services';
import { Response } from 'express';
import { SortBlogDTO } from '../dtos';

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

  @Get('/list')
  @ApiQuery({ name: 'filters', required: false })
  @ApiQuery({ name: 'sort', required: false })
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  @ApiQuery({ name: 'limit', required: false, type: 'number' })
  async listBlogs(
    @Res() res: Response,
    @Query('page') page = 1,
    @Query('limit') limit = 8,
    @Query('sort') sort: SortBlogDTO,
    @Query('filters') filters: string,
  ) {
    limit = limit > 100 ? 100 : limit;
    const data = await this.blogService.findAll(
      {
        page: 1,
        limit: page * limit,
      },
      JSON.parse(filters),
      sort,
    );
    return res.json({ data });
  }

  @Get('/')
  @ApiQuery({ name: 'slug', required: true })
  async getBlog(@Res() res: Response, @Query('slug') slug: string) {
    const data = await this.blogService.findOne(slug);
    return res.json({ data });
  }
}
