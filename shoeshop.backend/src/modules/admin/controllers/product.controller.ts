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
  UploadedFiles,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { ProductService } from '@admin/services';
import { CreateProductDTO } from '../dtos';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
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

  @Post('/create')
  async createProduct(@Body() payload: CreateProductDTO) {
    return await this.productService.createProduct(payload);
  }

  @Delete('/delete/:id')
  async deleteProduct(@Param('id') id: number) {
    return await this.productService.deleteProduct(id);
  }

  @Put('/thumbnail/update/:id')
  @UseInterceptors(FileInterceptor('thumbnail'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
    @Param('id') id: number,
  ) {
    await this.productService.updateThumbnail(id, file.filename);
    return res.json({ ok: true });
  }

  @Put('/images/update/:id')
  @UseInterceptors(FilesInterceptor('images'))
  async uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Res() res: Response,
    @Param('id') id: number,
  ) {
    const urls = files.map((x) => x.filename);
    await this.productService.updateImages(id, urls);
    return res.json({ ok: true });
  }
}
