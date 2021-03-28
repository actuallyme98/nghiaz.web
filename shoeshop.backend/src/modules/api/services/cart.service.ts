import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cart, CartItem, Client, Product } from '@api/entities';
import { ErrorHelper, StringHelper } from '@base/helpers';
import { AddCartLineDTO, UpdateCartLineDTO } from '../dtos';

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
  ) {}

  async getCart(clientId: number) {
    let client = await this.clientRepository.findOne(clientId);
    if (!client) {
      const cart = await this.createCart(clientId);
      return await this.cartRepository
        .createQueryBuilder('c')
        .leftJoinAndSelect('c.client', 'client')
        .leftJoinAndSelect('c.cartItems', 'cart_item')
        .leftJoinAndSelect('cart_item.product', 'product')
        .andWhere('c.id = :id', { id: cart.id })
        .getOne();
    }
    return await this.cartRepository
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.client', 'client')
      .leftJoinAndSelect('c.cartItems', 'cart_item')
      .leftJoinAndSelect('cart_item.product', 'product')
      .andWhere('client.id = :clientId', { clientId })
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
    const { cartId, clientId, productId, amount } = args;

    const product = await this.productRepository.findOne(productId);
    if (!product) {
      throw ErrorHelper.BadRequestException('Not found');
    }
    let cart = await this.cartRepository.findOne(cartId, {
      relations: ['cartItems'],
    });
    if (!cart) {
      cart = await this.createCart(clientId);
    }
    let cartItem = await this.cartItemRepository
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.product', 'product')
      .andWhere('product.id = :productId', { productId })
      .getOne();
    if (!cartItem) {
      cartItem = new CartItem({
        cart,
        product,
        amount,
      });
    } else {
      Object.assign(cartItem, {
        amount: cartItem.amount + amount,
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
}
