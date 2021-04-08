import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';

import { Category, Color, Product, Size, ProductImage } from '@api/entities';

import { ErrorHelper, StringHelper } from '@base/helpers';
import { CreateProductDTO, FilterProductDTO, UpdateProductDTO } from '../dtos';
import { classToPlain } from 'class-transformer';

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

  async listProducts(options: IPaginationOptions, filters: FilterProductDTO) {
    const queryBuilder = this.productRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.categories', 'category')
      .leftJoinAndSelect('p.colors', 'color')
      .leftJoinAndSelect('p.images', 'product_image')
      .leftJoinAndSelect('p.sizes', 'size');

    const { categories, colors, sizes } = filters;
    if (colors && colors.length > 0) {
      queryBuilder.andWhere('color.id IN (:...colors)', { colors });
    }
    if (sizes && sizes.length > 0) {
      queryBuilder.andWhere('size.id IN (:...sizes)', { sizes });
    }
    if (categories && categories.length > 0) {
      queryBuilder.andWhere('category.id IN (:...categories)', { categories });
    }
    let records = await paginate(queryBuilder, options);
    let items = classToPlain(records.items);
    records = Object.assign(records, {
      items,
    });
    return records;
  }

  async createProduct(args: CreateProductDTO) {
    const { colorIds, categoryIds, sizeIds } = args;
    const product = await this.productRepository.findOne({
      where: {
        slug: args.slug,
      },
    });
    if (product) {
      throw ErrorHelper.BadRequestException('Sản phẩm đã tồn tại');
    }

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
      code: StringHelper.randomString(6),
      colors,
      sizes,
      categories,
    });
    await newProduct.save();
  }

  async updateProduct(args: UpdateProductDTO) {
    const { colorIds, categoryIds, sizeIds, id } = args;
    const pr = await this.productRepository.findOne(id);
    if (!pr) {
      throw ErrorHelper.BadRequestException('[Product] not found');
    }
    const product = await this.productRepository
      .createQueryBuilder('p')
      .andWhere('p.slug = :slug', { slug: args.slug })
      .andWhere('p.id != :id', { id })
      .getOne();
    if (product) {
      throw ErrorHelper.BadRequestException(`[${args.slug}] đã tồn tại`);
    }
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
          await new ProductImage({
            url,
          }).save(),
      ),
    );
    Object.assign(data, {
      images,
    });
    await data.save();
  }
}
