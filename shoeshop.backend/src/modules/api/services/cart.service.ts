import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as moment from 'moment';

import { Cart, CartItem, Client, Product, Voucher, VoucherCode, Size, Color } from '@api/entities';
import { ErrorHelper, StringHelper } from '@base/helpers';
import { AddCartLineDTO, ApplyVoucherDTO, UpdateCartLineDTO } from '../dtos';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Voucher)
    private readonly voucherRepository: Repository<Voucher>,
    @InjectRepository(VoucherCode)
    private readonly voucherCodeRepository: Repository<VoucherCode>,
    @InjectRepository(Size)
    private readonly sizeRepository: Repository<Size>,
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
  ) {}

  async getCart(clientId: number) {
    let client = await this.clientRepository.findOne(clientId);
    if (!client) {
      const cart = await this.createCart(clientId);
      return await this.cartRepository
        .createQueryBuilder('c')
        .leftJoinAndSelect('c.client', 'client')
        .leftJoinAndSelect('c.cartItems', 'cart_item')
        .leftJoinAndSelect('cart_item.color', 'color')
        .leftJoinAndSelect('cart_item.size', 'size')
        .leftJoinAndSelect('cart_item.product', 'product')
        .leftJoinAndSelect('c.voucherCode', 'voucher_code')
        .leftJoinAndSelect('voucher_code.voucher', 'voucher')
        .andWhere('c.id = :id', { id: cart.id })
        .getOne();
    }
    let cart = await this.cartRepository
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.client', 'client')
      .andWhere('client.id = :clientId', { clientId })
      .getOne();
    if (!cart) {
      cart = await this.createCart(clientId);
    }
    return await this.cartRepository
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.client', 'client')
      .leftJoinAndSelect('c.cartItems', 'cart_item')
      .leftJoinAndSelect('cart_item.color', 'color')
      .leftJoinAndSelect('cart_item.size', 'size')
      .leftJoinAndSelect('cart_item.product', 'product')
      .leftJoinAndSelect('c.voucherCode', 'voucher_code')
      .leftJoinAndSelect('voucher_code.voucher', 'voucher')
      .andWhere('c.id = :id', { id: cart.id })
      .getOne();
  }

  async createCart(clientId: number) {
    let client = await this.clientRepository.findOne(clientId);
    if (!client) {
      client = new Client({
        id: clientId,
        gender: 'UNDEFINED' as any,
        dob: '',
        avatar: '',
        clone: 0,
      });
      await client.save();
    }
    const newCart = new Cart({
      client,
      cartItems: [],
    });
    return await newCart.save();
  }

  async addCartLine(args: AddCartLineDTO) {
    const { cartId, clientId, productId, amount, color, size } = args;

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
    let cart = await this.cartRepository.findOne(cartId, {
      relations: ['cartItems'],
    });
    if (!cart) {
      cart = await this.createCart(clientId);
    }
    let cartItem = await this.cartItemRepository
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.color', 'color')
      .leftJoinAndSelect('c.size', 'size')
      .leftJoinAndSelect('c.product', 'product')
      .andWhere('product.id = :productId', { productId })
      .andWhere('size.id = :size', { size })
      .andWhere('color.id = :color', { color })
      .getOne();
    if (!cartItem) {
      cartItem = new CartItem({
        cart,
        product,
        amount,
        size: sizeEntity,
        color: colorEntity,
      });
    } else {
      Object.assign(cartItem, {
        amount: cartItem.amount + amount,
        size: sizeEntity,
        color: colorEntity,
      });
    }
    await cartItem.save();

    Object.assign(cart, {
      cartItems: cart.cartItems.concat(cartItem),
    });
    try {
      return await cart.save();
    } catch (err) {
      throw ErrorHelper.BadRequestException(err);
    }
  }

  async updateCartItem(args: UpdateCartLineDTO) {
    const { cartItemId, amount } = args;
    const cartItem = await this.cartItemRepository.findOne(cartItemId);
    if (!cartItem) {
      throw ErrorHelper.BadRequestException('Not found');
    }
    if (amount === 0) {
      try {
        await this.cartItemRepository.delete(cartItemId);
        return;
      } catch (err) {
        throw ErrorHelper.BadRequestException(err);
      }
    }
    Object.assign(cartItem, {
      amount,
    });
    try {
      await cartItem.save();
    } catch (err) {
      throw ErrorHelper.BadRequestException(err);
    }
  }

  async deleteCartItem(id: number) {
    try {
      await this.cartItemRepository.delete(id);
    } catch (err) {
      throw ErrorHelper.BadRequestException(err);
    }
  }

  async applyVoucher(args: ApplyVoucherDTO) {
    const { cartId, code, price } = args;
    const voucherCode = await this.voucherCodeRepository
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.voucher', 'voucher')
      .andWhere('c.code = :code', { code })
      .getOne();
    if (!voucherCode) {
      throw ErrorHelper.BadRequestException('Mã voucher không tồn tại');
    }
    if (voucherCode.isUsed) {
      throw ErrorHelper.BadRequestException('Mã voucher đã được sử dụng');
    }
    const voucher = await this.voucherRepository
      .createQueryBuilder('v')
      .leftJoinAndSelect('v.voucherCodes', 'voucher_code')
      .andWhere('voucher_code.code = :code', { code })
      .getOne();
    if (!voucher) {
      throw ErrorHelper.BadRequestException('Mã voucher không tồn tại');
    }
    if (moment(moment().format('YYYY-MM-DD')).isSameOrAfter(moment(voucher.endDate.trim()))) {
      throw ErrorHelper.BadRequestException('Mã voucher đã hết hạn');
    }
    if (moment(moment().format('YYYY-MM-DD')).isSameOrBefore(moment(voucher.startDate.trim()))) {
      throw ErrorHelper.BadRequestException('Mã voucher chưa đến thời gian sử dụng');
    }
    const cart = await this.cartRepository
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.voucherCode', 'voucher_code')
      .leftJoinAndSelect('voucher_code.voucher', 'voucher')
      .andWhere('c.id = :cartId', { cartId })
      .getOne();
    if (!cart) {
      throw ErrorHelper.BadRequestException('[Cart] not found');
    }
    if (cart.voucherCode) {
      await this.voucherCodeRepository.update(cart.voucherCode.id, {
        isUsed: 0,
      });
    }
    // Validation voucher
    const buyMore = voucher.requireMinPrice - price;
    if (buyMore > 0) {
      throw ErrorHelper.BadRequestException(`Bạn cần mua ${buyMore} để được áp dụng`);
    }
    Object.assign(voucherCode, {
      isUsed: 1,
    });
    await voucherCode.save();
    Object.assign(cart, {
      voucherCode,
    });
    return await cart.save();
  }
  async getVoucherCode() {
    const voucher = await this.voucherCodeRepository
      .createQueryBuilder('v')
      .leftJoinAndSelect('v.voucher', 'voucher')
      .andWhere('v.isUsed = :used', { used: 0 })
      .getOne();
    return voucher;
  }
}
