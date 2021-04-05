import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';

import { Order, Product } from '@api/entities';
import { FilterOrderDTO, OrderStatusEnums } from '@admin/dtos';

import { ErrorHelper, StringHelper } from '@base/helpers';
import { classToPlain } from 'class-transformer';
import * as moment from 'moment';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(options: IPaginationOptions, filters: FilterOrderDTO): Promise<Pagination<Order>> {
    const queryBuilder = this.orderRepository
      .createQueryBuilder('o')
      .leftJoinAndSelect('o.client', 'client')
      .leftJoinAndSelect('o.city', 'city')
      .leftJoinAndSelect('o.district', 'district')
      .leftJoinAndSelect('o.ward', 'ward')
      .leftJoinAndSelect('o.orderItems', 'order_item')
      .leftJoinAndSelect('order_item.color', 'color')
      .leftJoinAndSelect('order_item.size', 'size')
      .leftJoinAndSelect('order_item.product', 'product')
      .leftJoinAndSelect('o.carrier', 'carrier');

    const { code, createdAt, type, status } = filters;
    if (code) {
      queryBuilder.andWhere('o.code like :s', { s: `%${code}%` });
    }
    if (status) {
      queryBuilder.andWhere('o.status = :status', { status });
    }
    let records = await paginate(queryBuilder, options);
    let items = classToPlain(records.items);
    if (createdAt) {
      switch (type) {
        case 'date':
          items = items.filter((item) => moment(item.createdAt).format('YYYY-MM-DD') === createdAt);
          break;
        case 'month':
          items = items.filter((item) => moment(item.createdAt).format('YYYY-MM') === createdAt);
          break;
        case 'year':
          items = items.filter((item) => moment(item.createdAt).format('YYYY') === createdAt);
          break;
        default:
          break;
      }
    }
    records = Object.assign(records, {
      items,
    });
    return records;
  }

  async updateStatusOrder(id: number, status: OrderStatusEnums) {
    const order = await this.orderRepository.findOne(id, {
      relations: ['orderItems', 'orderItems.product'],
    });
    if (!order) {
      throw ErrorHelper.BadRequestException('[Order] not found');
    }

    if (order.status.trim() === 'SHIPPING' && status === 'SHIPPING') {
      throw ErrorHelper.BadRequestException('[Order] is SHIPPING');
    }

    const products = order.orderItems.map((item) => ({
      id: item.product.id,
      quantity: item.amount,
    }));

    if (status === 'SHIPPING') {
      for (const item of products) {
        try {
          const product = await this.productRepository.findOne(item.id);
          if (!product) {
            throw ErrorHelper.BadRequestException('[Product] not found');
          }
          const newQuantity = product.quantity - item.quantity;
          Object.assign(product, {
            quantity: Math.max(newQuantity, 0),
          });
          await product.save();
        } catch (err) {
          continue;
        }
      }
    }
    Object.assign(order, {
      status,
    });
    return await order.save();
  }

  async deleteOrder(id: number) {
    return await this.orderRepository.delete(id);
  }
}
