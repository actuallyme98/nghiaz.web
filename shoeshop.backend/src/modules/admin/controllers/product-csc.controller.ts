import { Controller, Post, Res, Body, Get, Put, Delete, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

import { CreateColorDTO, CreateSizeDTO, UpdateSizeDTO, UpdateColorDTO } from '@admin/dtos';

import { ProductCSC } from '@admin/services';
@ApiBearerAuth()
@ApiTags('products-csc')
@Controller('products-csc')
export class ProductCSCController {
  constructor(private productCscService: ProductCSC) {}

  @ApiResponse({
    status: 200,
  })
  @Get('/size/list')
  async listSizes(@Res() res: Response) {
    const data = await this.productCscService.listSizes();
    return res.json({ data });
  }

  @Post('/size')
  async createSize(@Body() payload: CreateSizeDTO) {
    return await this.productCscService.createSize(payload);
  }

  @Put('/size')
  async updateSize(@Body() payload: UpdateSizeDTO) {
    return await this.productCscService.updateSize(payload);
  }

  @Delete('/size/:id')
  async deleteSize(@Param('id') id: number) {
    return await this.productCscService.deleteSize(id);
  }

  @ApiResponse({
    status: 200,
  })
  @Get('/color/list')
  async listColors(@Res() res: Response) {
    const data = await this.productCscService.listColors();
    return res.json({ data });
  }

  @Post('/color')
  async createColor(@Body() payload: CreateColorDTO) {
    return await this.productCscService.createColor(payload);
  }

  @Put('/color')
  async updateColor(@Body() payload: UpdateColorDTO) {
    return await this.productCscService.updateColor(payload);
  }

  @Delete('/color/:id')
  async deleteColor(@Param('id') id: number) {
    return await this.productCscService.deleteColor(id);
  }

  @ApiResponse({
    status: 200,
  })
  @Get('/category/list')
  async listCategory(@Res() res: Response) {
    const data = await this.productCscService.listCategories();
    return res.json({ data });
  }
}
