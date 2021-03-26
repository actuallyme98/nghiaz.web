import { Body, Controller, Get, Param, Query, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiQuery } from '@nestjs/swagger';

import { ProductService } from '@api/services';

import { Response } from 'express';
import { SortOptions, SearchOptions } from '../dtos';

@ApiBearerAuth()
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @ApiResponse({
    status: 200,
  })
  @Get('/list')
  @ApiQuery({ name: 'filters', required: false })
  @ApiQuery({ name: 'sorts', required: false })
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  @ApiQuery({ name: 'limit', required: false, type: 'number' })
  async listProducts(
    @Res() res: Response,
    @Query('page') page = 1,
    @Query('limit') limit = 8,
    @Query('sorts') sorts: SortOptions,
    @Query('filters') filters: SearchOptions,
  ) {
    limit = limit > 100 ? 100 : limit;
    const data = await this.productService.findAll(
      {
        page: 1,
        limit: page * limit,
      },
      sorts,
      filters,
    );
    return res.json({ data });
  }

  @Get('/detail/:slug')
  async getProduct(@Param('slug') slug: string, @Res() res: Response) {
    const data = await this.productService.getProduct(slug);
    return res.json({ data });
  }
}
