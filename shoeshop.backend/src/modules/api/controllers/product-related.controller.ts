import { Body, Controller, Get, Param, Query, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

import { ProductRelatedService } from '@api/services';

import { Response } from 'express';

@ApiBearerAuth()
@ApiTags('product')
@Controller('product')
export class ProductRelatedController {
  constructor(private readonly productService: ProductRelatedService) {}

  @Get('/related/:code')
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  @ApiQuery({ name: 'limit', required: false, type: 'number' })
  async getProductRelated(
    @Param('code') code: string,
    @Query('page') page = 1,
    @Query('limit') limit = 8,
    @Res() res: Response,
  ) {
    limit = limit > 100 ? 100 : limit;
    const data = await this.productService.calculateRelated(
      {
        page,
        limit,
      },
      code,
    );
    return res.json({ data });
  }
}
