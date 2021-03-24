import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { APIRequest } from '@api/interfaces';

import { ProductService } from '@api/services';

import { Response } from 'express';

@ApiBearerAuth()
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @ApiResponse({
    status: 200,
  })
  @Get('/list')
  async listProducts(@Req() req: APIRequest, @Res() res: Response) {
    const data = await this.productService.listProducts();
    return res.json({ data });
  }

  @Get('/detail/:slug')
  async getProduct(@Param('slug') slug: string, @Res() res: Response) {
    const data = await this.productService.getProduct(slug);
    return res.json({ data });
  }
}
