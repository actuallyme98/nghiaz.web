import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '@api/entities';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async listProducts() {
    return this.productRepository
      .createQueryBuilder('pr')
      .leftJoinAndSelect('pr.images', 'product_image')
      .leftJoinAndSelect('pr.sizes', 'size')
      .leftJoinAndSelect('pr.colors', 'color')
      .getMany();
  }

  async getProduct(slug: string) {
    return this.productRepository
      .createQueryBuilder('pr')
      .where('slug = :slug', { slug })
      .leftJoinAndSelect('pr.images', 'product_image')
      .leftJoinAndSelect('pr.sizes', 'size')
      .leftJoinAndSelect('pr.colors', 'color')
      .getOne();
  }
}
