import { Column, PrimaryGeneratedColumn, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseModel } from './base-model.entity';

import { Color, Order, Product } from '@api/entities';
import { Cart } from './cart.entity';

@Entity('order_item')
export class OrderItem extends BaseModel {
  constructor(partial: Partial<OrderItem>) {
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
  @ManyToOne(() => Product)
  @JoinColumn()
  product: Product;

  @ManyToOne(() => Order, (order) => order.orderItems)
  @JoinColumn()
  order: Cart;
}
