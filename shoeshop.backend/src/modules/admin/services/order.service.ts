import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';

import { Order } from '@api/entities';
import { FilterOrderDTO, OrderStatusEnums } from '@admin/dtos';

import { ErrorHelper, StringHelper } from '@base/helpers';
import { classToPlain } from 'class-transformer';
import * as moment from 'moment';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async findAll(options: IPaginationOptions, filters: FilterOrderDTO): Promise<Pagination<Order>> {
    const queryBuilder = this.orderRepository
      .createQueryBuilder('o')
      .leftJoinAndSelect('o.client', 'client')
      .leftJoinAndSelect('o.city', 'city')
      .leftJoinAndSelect('o.district', 'district')
      .leftJoinAndSelect('o.ward', 'ward')
      .leftJoinAndSelect('o.orderItems', 'order_item')
      .leftJoinAndSelect('o.carrier', 'carrier');

    const { code, createdAt, type } = filters;
    if (code) {
      queryBuilder.andWhere('o.code = :code', { code });
    }
    let records = await paginate(queryBuilder, options);
    let items = classToPlain(records.items) as Order[];
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
    const order = await this.orderRepository.findOne(id);
    if (!order) {
      throw ErrorHelper.BadRequestException('[Order] not found');
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
