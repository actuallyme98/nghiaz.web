import { Injectable } from '@nestjs/common';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category, Color, Product, Size } from '@api/entities';
import { classToPlain } from 'class-transformer';

import { SearchOptions, SortOptions } from '@api/dtos';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Size)
    private readonly sizeRepository: Repository<Size>,
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
  ) {}

  async listSizes() {
    return await this.sizeRepository.find();
  }
  async listColors() {
    return await this.colorRepository.find();
  }

  async listCategories() {
    return this.categoryRepository.find();
  }

  async getCategory(slug: string) {
    return await this.categoryRepository.findOne({
      where: {
        slug,
      },
    });
  }

  async findAll(
    options: IPaginationOptions,
    sortOptions: SortOptions = '-priority',
    searchOptions?: SearchOptions,
  ): Promise<Pagination<Product>> {
    const queryBuilder = this.productRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.images', 'product_image')
      .leftJoinAndSelect('p.sizes', 'size')
      .leftJoinAndSelect('p.colors', 'color')
      .leftJoinAndSelect('p.categories', 'category');

    if (searchOptions) {
      const { code, colors, name, sizes, isSpecial, isSellWell, categories, price } = searchOptions;
      if (code) {
        queryBuilder.andWhere('p.code = :code', { code });
      }
      if (name) {
        queryBuilder.andWhere('p.name like :s', { s: `%${name}%` });
      }
      if (colors && colors.length > 0) {
        queryBuilder.andWhere('color.id IN (:...colors)', { colors });
      }
      if (sizes && sizes.length > 0) {
        queryBuilder.andWhere('size.id IN (:...sizes)', { sizes });
      }
      if (categories && categories.length > 0) {
        queryBuilder.andWhere('category.id IN (:...categories)', { categories });
      }
      if (isSellWell) {
        queryBuilder.andWhere('p.isSellWell = :pk', { pk: 1 });
      }
      if (isSpecial) {
        queryBuilder.andWhere('p.isSpecial = :pk', { pk: 1 });
      }
      if (price) {
        const { start, end } = price;
        queryBuilder.andWhere('p.currentPrice BETWEEN :start AND :end', { start, end });
      }
    }

    switch (sortOptions) {
      case '-createdAt':
        queryBuilder.orderBy('p.createdAt', 'ASC');
        break;
      case '-priority':
        queryBuilder.orderBy('p.priority', 'ASC');
        break;
      case '-currentPrice':
        queryBuilder.orderBy('p.currentPrice', 'DESC');
        break;
      case 'currentPrice':
        queryBuilder.orderBy('p.currentPrice', 'ASC');
        break;
      default:
        queryBuilder.orderBy('p.createdAt', 'ASC');
        break;
    }

    let records = await paginate(queryBuilder, options);
    const items = classToPlain(records.items);
    records = Object.assign(records, {
      items,
    });
    return records;
  }

  async getProduct(code: string) {
    return this.productRepository
      .createQueryBuilder('pr')
      .where('pr.code = :code', { code })
      .leftJoinAndSelect('pr.images', 'product_image')
      .leftJoinAndSelect('pr.sizes', 'size')
      .leftJoinAndSelect('pr.colors', 'color')
      .getOne();
  }
}
