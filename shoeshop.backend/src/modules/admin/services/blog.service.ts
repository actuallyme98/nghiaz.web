import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';

import { Blog, BlogCategory } from '@api/entities';

import { ErrorHelper } from '@base/helpers';
import { classToPlain } from 'class-transformer';
import { CreateBlogCategoryDTO, CreateBlogDTO, UpdateBlogCategoryDTO } from '../dtos';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    @InjectRepository(BlogCategory)
    private readonly blogCategoryRepository: Repository<BlogCategory>,
  ) {}
  async findAll(options: IPaginationOptions, categoryId?: number) {
    const queryBuilder = this.blogRepository.createQueryBuilder('b');

    if (categoryId) {
      queryBuilder
        .leftJoinAndSelect('b.category', 'blog_category')
        .andWhere('blog_category.id = :categoryId', { categoryId });
    }
    let records = await paginate(queryBuilder, options);
    let items = classToPlain(records.items);
    records = Object.assign(records, {
      items,
    });
    return records;
  }
  async listBlogCategories() {
    return await this.blogCategoryRepository.find();
  }
  async createBlogCategory(args: CreateBlogCategoryDTO) {
    const category = await this.blogCategoryRepository.findOne({
      where: {
        slug: args.slug,
      },
    });
    if (category) {
      throw ErrorHelper.BadRequestException(`[${args.slug}] exist`);
    }
    const newCategory = new BlogCategory(args);
    return await newCategory.save();
  }
  async updateBlogCategory(args: UpdateBlogCategoryDTO) {
    const category = await this.blogCategoryRepository.findOne(args.id);
    if (!category) {
      throw ErrorHelper.BadRequestException(`[Category] not found`);
    }
    Object.assign(category, args);
    return await category.save();
  }
  async deleteBlogCategory(id: number) {
    return await this.blogCategoryRepository.delete(id);
  }
  async createBlog(args: CreateBlogDTO) {
    const blog = await this.blogRepository.findOne({
      where: {
        slug: args.slug,
      },
    });
    if (blog) {
      throw ErrorHelper.BadRequestException(`[${args.slug}] exist`);
    }
    const category = await this.blogCategoryRepository.findOne(args.category);
    const newBlog = new Blog({
      ...args,
      category,
      thumbnail: '',
    });
    const data = await newBlog.save();
    return data.id;
  }
  async updateThumbnail(id: number, thumbnail: string) {
    const blog = await this.blogRepository.findOne(id);
    if (!blog) {
      throw ErrorHelper.BadRequestException(`[Blog] not found`);
    }
    Object.assign(blog, {
      thumbnail,
    });
    return await blog.save();
  }
  async deleteBlog(id: number) {
    await this.blogRepository.delete(id);
  }
}
