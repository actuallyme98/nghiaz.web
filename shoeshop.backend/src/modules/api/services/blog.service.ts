import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { classToPlain } from 'class-transformer';

import { EncryptHelper, ErrorHelper } from '@base/helpers';

import { Blog, BlogCategory } from '@api/entities';

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
}
