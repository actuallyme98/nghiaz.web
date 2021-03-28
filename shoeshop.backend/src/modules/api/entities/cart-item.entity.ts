import { Column, PrimaryGeneratedColumn, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseModel } from './base-model.entity';

import { Product } from '@api/entities';
import { Cart } from './cart.entity';

@Entity('cart_item')
export class CartItem extends BaseModel {
  constructor(partial: Partial<CartItem>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'int',
  })
  amount: number;

  // Relationship
  @OneToOne(() => Product)
  @JoinColumn()
  product: Product;

  @ManyToOne(() => Cart, (cart) => cart.cartItems)
  @JoinColumn()
  cart: Cart;
}
