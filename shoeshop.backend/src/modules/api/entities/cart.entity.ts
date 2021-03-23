import { Column, PrimaryGeneratedColumn, Entity, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseModel } from './base-model.entity';

import { Client, CartItem } from '@api/entities';

@Entity('cart')
export class Cart extends BaseModel {
  constructor(partial: Partial<Cart>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('rowid')
  id: number;

  // Relationship
  @OneToOne(type => Client)
  @JoinColumn()
  client: Client;

  @OneToMany(
    type => CartItem,
    cartItem => cartItem.cartId,
    { cascade: true },
  )
  @JoinColumn({ name: 'id', referencedColumnName: 'cart_id' })
  items: CartItem[];
}
