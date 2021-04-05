import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { classToPlain } from 'class-transformer';

import { EncryptHelper, ErrorHelper } from '@base/helpers';

import { Blog, BlogCategory } from '@api/entities';
import { FilterBlogDTO, SortBlogDTO } from '../dtos';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    @InjectRepository(BlogCategory)
    private readonly blogCategoryRepository: Repository<BlogCategory>,
  ) {}

  async listCategories() {
    return await this.blogCategoryRepository.find();
  }
  async findAll(options: IPaginationOptions, filters?: FilterBlogDTO, sort?: SortBlogDTO) {
    const queryBuilder = this.blogRepository
      .createQueryBuilder('b')
      .leftJoinAndSelect('b.category', 'blog_category');
    if (filters) {
      const { category, title } = filters;
      if (category) {
        queryBuilder.andWhere('blog_category.slug = :category', { category });
      }
      if (title) {
        queryBuilder.andWhere('b.title like :s', { s: `%${title}%` });
      }
    }
    if (sort) {
      switch (sort) {
        case '-createdAt':
          queryBuilder.orderBy('b.createdAt', 'ASC');
          break;
        case 'createdAt':
          queryBuilder.orderBy('b.createdAt', 'DESC');
          break;
        default:
          break;
      }
    }
    let records = await paginate(queryBuilder, options);
    const items = classToPlain(records.items);
    records = Object.assign(records, {
      items,
    });
    return records;
  }
  async findOne(slug: string) {
    return await this.blogRepository.findOne({
      where: {
        slug,
      },
      relations: ['category'],
    });
  }
}
