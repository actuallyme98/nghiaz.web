import { Injectable } from '@nestjs/common';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '@api/entities';
import { classToPlain } from 'class-transformer';

import { SearchOptions, SortOptions } from '@api/dtos';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

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
      if (colors) {
        queryBuilder.andWhere('p.colors @> :colors', { colors });
      }
      if (sizes) {
        queryBuilder.andWhere('p.sizes @> :sizes', { sizes });
      }
      if (categories) {
        queryBuilder.andWhere('p.categories @> :categories', { categories });
      }
      if (isSellWell) {
        queryBuilder.andWhere('p.isSellWell = 1');
      }
      if (isSpecial) {
        queryBuilder.andWhere('p.isSpecial = 1');
      }
      if (price) {
        const { start, end } = price;
        queryBuilder.andWhere('p. price between :start and :end', { start, end });
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
        queryBuilder.orderBy('p.currentPrice', 'ASC');
        break;
      case 'currentPrice':
        queryBuilder.orderBy('p.currentPrice', 'DESC');
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
