import { PrimaryGeneratedColumn, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseModel } from './base-model.entity';

import { Client, CartItem } from '@api/entities';

@Entity('cart')
export class Cart extends BaseModel {
  constructor(partial: Partial<Cart>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('increment')
  id: number;

  // Relationship
  @OneToOne(() => Client)
  @JoinColumn()
  client: Client;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  @JoinColumn()
  cartItems: CartItem[];
}
