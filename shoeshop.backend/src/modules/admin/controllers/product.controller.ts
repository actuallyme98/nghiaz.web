import {
  Controller,
  Post,
  Res,
  Body,
  Get,
  Delete,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { ProductService } from '@admin/services';
import { CreateProductDTO } from '../dtos';
import { FileInterceptor } from '@nestjs/platform-express';
@ApiBearerAuth()
@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/list')
  async profile(@Res() res: Response) {
    const data = await this.productService.listProducts();
    return res.json({ data });
  }

  @Post('/')
  async createProduct(@Body() payload: CreateProductDTO) {
    return await this.createProduct(payload);
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: number) {
    return await this.deleteProduct(id);
  }

  @Post('/thumbnail/update')
  @UseInterceptors(FileInterceptor('thumbnail'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    return res.json({ ok: true });
  }
}
