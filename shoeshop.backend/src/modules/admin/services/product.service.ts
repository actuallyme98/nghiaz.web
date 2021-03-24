import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category, Color, Product, Size, ProductImage } from '@api/entities';

import { ErrorHelper } from '@base/helpers';
import { CreateProductDTO } from '../dtos';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Size)
    private readonly sizeRepository: Repository<Size>,
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async listProducts() {
    return this.productRepository.find();
  }

  async createProduct(args: CreateProductDTO) {
    const { colorIds, categoryIds, sizeIds } = args;
    const colors = await Promise.all(
      colorIds.map(async (id) => await this.colorRepository.findOne(id)),
    );
    const sizes = await Promise.all(
      sizeIds.map(async (id) => await this.sizeRepository.findOne(id)),
    );
    const categories = await Promise.all(
      categoryIds.map(async (id) => await this.categoryRepository.findOne(id)),
    );
    const newProduct = new Product({
      ...args,
      colors,
      sizes,
      categories,
    });
    await newProduct.save();
  }

  async deleteProduct(id: number) {
    await this.productRepository.delete(id);
  }

  async updateThumbnail(id: number, thumbnail: string) {
    const data = await this.productRepository.findOne(id);
    if (!data) {
      throw ErrorHelper.BadRequestException('Not found');
    }
    Object.assign(data, {
      thumbnail,
    });
    await data.save();
  }

  async updateImages(id: number, urls: string[]) {
    const data = await this.productRepository.findOne(id);
    if (!data) {
      throw ErrorHelper.BadRequestException('Not found');
    }
    const images = await Promise.all(
      urls.map(
        async (url) =>
          new ProductImage({
            productId: id,
            url,
          }),
      ),
    );
    Object.assign(data, {
      images,
    });
    await data.save();
  }
}
