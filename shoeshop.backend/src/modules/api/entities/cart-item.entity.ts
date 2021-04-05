import { Column, PrimaryGeneratedColumn, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseModel } from './base-model.entity';

import { Color, Product, Size, Cart } from '@api/entities';

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
  @OneToOne(() => Product, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  product: Product;

  @OneToOne(() => Color, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  color: Color;

  @OneToOne(() => Size, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  size: Size;

  @ManyToOne(() => Cart, (cart) => cart.cartItems)
  @JoinColumn()
  cart: Cart;
}
