import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';

import { EncryptHelper, ErrorHelper, StringHelper } from '@base/helpers';

import { CreateOrderDTO, FilterOrderDTO, OrderItemDTO, OrderStatusEnums } from '@api/dtos';

import {
  Client,
  Order,
  OrderItem,
  City,
  District,
  Ward,
  Product,
  Carrier,
  Cart,
  CartItem,
  Size,
  Color,
} from '@api/entities';
import { classToPlain } from 'class-transformer';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Client)
    private readonly clientItemRepository: Repository<Client>,
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
    @InjectRepository(District)
    private readonly districtRepository: Repository<District>,
    @InjectRepository(Ward)
    private readonly wardRepository: Repository<Ward>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Carrier)
    private readonly carrierRepository: Repository<Carrier>,
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(Size)
    private readonly sizeRepository: Repository<Size>,
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
  ) {}

  async listOrders(clientId: number, options: IPaginationOptions, filters: FilterOrderDTO) {
    const client = await this.clientItemRepository.findOne(clientId);
    if (!client) {
      throw ErrorHelper.BadRequestException('Unauthorized');
    }
    const queryBuilder = this.orderRepository
      .createQueryBuilder('o')
      .leftJoinAndSelect('o.client', 'client')
      .leftJoinAndSelect('o.city', 'city')
      .leftJoinAndSelect('o.district', 'district')
      .leftJoinAndSelect('o.ward', 'ward')
      .leftJoinAndSelect('o.orderItems', 'order_item')
      .leftJoinAndSelect('order_item.color', 'color')
      .leftJoinAndSelect('order_item.size', 'size')
      .leftJoinAndSelect('o.carrier', 'carrier')
      .leftJoinAndSelect('order_item.product', 'product')
      .andWhere('client.id = :clientId', { clientId });
    const { status } = filters;
    if (status) {
      queryBuilder.andWhere('o.status = :status', { status });
    }
    let records = await paginate(queryBuilder, options);
    const items = classToPlain(records.items);
    records = Object.assign(records, {
      items,
    });
    return records;
  }

  async getOrder(clientId: number, code: string) {
    return await this.orderRepository
      .createQueryBuilder('o')
      .leftJoinAndSelect('o.client', 'client')
      .leftJoinAndSelect('o.city', 'city')
      .leftJoinAndSelect('o.district', 'district')
      .leftJoinAndSelect('o.ward', 'ward')
      .leftJoinAndSelect('o.orderItems', 'order_item')
      .leftJoinAndSelect('order_item.color', 'color')
      .leftJoinAndSelect('order_item.size', 'size')
      .leftJoinAndSelect('o.carrier', 'carrier')
      .andWhere('client.id = :clientId', { clientId })
      .andWhere('o.code = :code', { code })
      .getOne();
  }

  async createOrder(args: CreateOrderDTO) {
    const {
      clientId,
      cityId,
      districtId,
      wardId,
      description,
      orderItems,
      address,
      name,
      paymentMethod,
      discountPrice,
      phone,
      price,
      reason,
      status,
      carrierId,
    } = args;
    const client = await this.clientItemRepository.findOne(clientId);
    if (!client) {
      throw ErrorHelper.BadRequestException('Unauthorized [client]');
    }
    const city = await this.cityRepository.findOne({
      where: {
        code: cityId,
      },
    });
    if (!city) {
      throw ErrorHelper.BadRequestException('Unauthorized [city]');
    }
    const district = await this.districtRepository.findOne({
      where: {
        code: districtId,
      },
    });
    if (!district) {
      throw ErrorHelper.BadRequestException('Unauthorized [district]');
    }
    const ward = await this.wardRepository.findOne({
      where: {
        code: wardId,
      },
    });
    if (!ward) {
      throw ErrorHelper.BadRequestException('Unauthorized [ward]');
    }
    const carrier = await this.carrierRepository.findOne(carrierId);
    if (!carrier) {
      throw ErrorHelper.BadRequestException('Unauthorized [carrier]');
    }
    const orderItemSaved = await Promise.all(
      orderItems.map(async (item) => {
        const { productId, amount, color, size } = item;
        const product = await this.productRepository.findOne(productId);
        const sizeEntity = await this.sizeRepository.findOne(size);
        const colorEntity = await this.colorRepository.findOne(color);
        if (!product) {
          throw ErrorHelper.BadRequestException('[Product] Not found');
        }
        if (!sizeEntity) {
          throw ErrorHelper.BadRequestException('[Size] Not found');
        }
        if (!colorEntity) {
          throw ErrorHelper.BadRequestException('[Color] Not found');
        }
        const orderItem = new OrderItem({ product, amount, color: colorEntity, size: sizeEntity });
        return await orderItem.save();
      }),
    );
    const newOrder = new Order({
      code: StringHelper.randomString(6),
      address,
      price,
      name,
      orderItems: orderItemSaved,
      paymentMethod,
      phone,
      reason,
      city,
      district,
      discountPrice,
      description,
      ward,
      client,
      status,
      carrier,
    });
    const cartItems = await this.cartItemRepository
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.cart', 'cart')
      .leftJoinAndSelect('c.color', 'color')
      .leftJoinAndSelect('c.size', 'size')
      .leftJoinAndSelect('cart.client', 'client')
      .andWhere('client.id = :clientId', { clientId })
      .getMany();
    await this.cartItemRepository.remove(cartItems);

    const cart = await this.cartRepository
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.client', 'client')
      .andWhere('client.id = :clientId', { clientId })
      .getOne();
    Object.assign(cart, {
      voucherCode: null,
    });
    await cart.save();

    return await newOrder.save();
  }

  async listCarriers() {
    return await this.carrierRepository.find();
  }
}
