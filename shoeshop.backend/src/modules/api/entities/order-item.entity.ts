import { Column, PrimaryGeneratedColumn, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseModel } from './base-model.entity';

import { Color, Order, Product, Size } from '@api/entities';

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
  @ManyToOne(() => Product, {
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

  @ManyToOne(() => Order, (order) => order.orderItems, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  order: Order;
}
