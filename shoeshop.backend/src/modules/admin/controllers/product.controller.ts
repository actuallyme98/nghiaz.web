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
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { ProductService } from '@admin/services';
import { CreateProductDTO, UpdateProductDTO } from '../dtos';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
@ApiBearerAuth()
@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/list')
  @ApiQuery({ name: 'filters', required: false })
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  @ApiQuery({ name: 'limit', required: false, type: 'number' })
  async profile(
    @Res() res: Response,
    @Query('page') page = 1,
    @Query('limit') limit = 5,
    @Query('filters') filters: string,
  ) {
    limit = limit > 100 ? 100 : limit;
    const data = await this.productService.listProducts(
      {
        page,
        limit,
      },
      JSON.parse(filters),
    );
    return res.json({ data });
  }

  @Post('/create')
  async createProduct(@Body() payload: CreateProductDTO, @Res() res: Response) {
    await this.productService.createProduct(payload);
    return res.json({ ok: true });
  }

  @Put('/update')
  async updateProduct(@Body() payload: UpdateProductDTO, @Res() res: Response) {
    await this.productService.updateProduct(payload);
    return res.json({ ok: true });
  }

  @Delete('/delete/:id')
  async deleteProduct(@Param('id') id: number, @Res() res: Response) {
    await this.productService.deleteProduct(id);
    return res.json({ ok: true });
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
