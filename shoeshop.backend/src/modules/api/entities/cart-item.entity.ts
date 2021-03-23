import { Column, PrimaryGeneratedColumn, Entity, OneToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './base-model.entity';

import { Product } from '@api/entities';

@Entity('cart_item')
export class CartItem extends BaseModel {
  constructor(partial: Partial<CartItem>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({
    name: 'cart_id',
    type: 'int',
  })
  cartId: number;

  @Column({
    type: 'int',
  })
  amount: number;

  // Relationship
  @OneToOne(type => Product)
  @JoinColumn()
  product: Product;
}
