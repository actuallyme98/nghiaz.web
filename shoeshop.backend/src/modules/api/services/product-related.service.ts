import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, IPaginationOptions } from 'nestjs-typeorm-paginate';

import { Order, Product } from '@api/entities';
import { classToPlain } from 'class-transformer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProductRelatedService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private configService: ConfigService,
  ) {}

  removeEmptyArr(arr: string[][]) {
    return arr.filter((x) => x.length > 0);
  }

  async calculateRelated(option: IPaginationOptions, code: string) {
    code = code.trim();
    const orders = await this.orderRepository
      .createQueryBuilder('o')
      .leftJoinAndSelect('o.orderItems', 'order_item')
      .leftJoinAndSelect('order_item.product', 'product')
      .getMany();

    const mapped = orders.map((order) => {
      const products = order.orderItems.map((item) => item.product.code.trim());
      return products;
    }); // get product codes
    const filtered = mapped.filter((x) => x.includes(code)); // ignore product not include current product
    const filtered2 = filtered.map((x) => x.filter((y) => y !== code)); // remove curretn product
    const filtered3 = this.removeEmptyArr(filtered2); // remove empty
    const mapped2 = filtered3.map((x) => {
      return x.reduce(
        (acc, value) => ({
          ...acc,
          [value]: (acc[value] || 0) + 1,
        }),
        {},
      );
    }); // count
    const mapped3 = mapped2.map((x) => {
      return Object.keys(x).filter((k) => x[k] >= this.configService.get('app.minsup'));
    }); // get product count > [MINSUP]
    const mapped4 = this.removeEmptyArr(mapped3); // remove empty

    const mapped5 = mapped4.join(',').split(','); // array 3d to 2d
    const mapped6 = [...new Set(mapped5)]; // remove duplicate

    const queryBuilder = this.productRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.colors', 'color')
      .leftJoinAndSelect('p.sizes', 'size')
      .andWhere('p.code IN (:...mapped6)', { mapped6 }); // list related products

    let records = await paginate(queryBuilder, option); // paging
    const items = classToPlain(records.items);
    records = Object.assign(records, {
      items,
    });
    return records;
  }
}
