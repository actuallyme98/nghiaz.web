import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToMany,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Carrier, City, Client, District, VoucherCode, Ward } from '.';
import { BaseModel } from './base-model.entity';

import { OrderItem } from '.';
import { OrderStatusEnums } from '../dtos';

@Entity('order')
export class Order extends BaseModel {
  constructor(partial: Partial<Order>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'char',
    length: 50,
  })
  status: OrderStatusEnums;

  @Column({
    type: 'char',
    length: 20,
  })
  code: string;

  @Column({
    type: 'nvarchar',
    length: 100,
  })
  reason: string;

  @Column({
    type: 'ntext',
  })
  description: string;

  @Column({
    type: 'int',
    default: 0,
  })
  discountPrice: number;

  @Column({
    type: 'int',
  })
  price: number;

  @Column({
    name: 'payment_method',
    type: 'char',
    length: 20,
  })
  paymentMethod: string;

  @Column({
    type: 'nvarchar',
    length: 30,
  })
  name: string;

  @Column({
    type: 'char',
    length: 20,
  })
  phone: string;

  @Column({
    type: 'ntext',
  })
  address: string;

  // Relationship
  @ManyToOne(() => City)
  @JoinColumn()
  city: City;

  @ManyToOne(() => District)
  @JoinColumn()
  district: District;

  @ManyToOne(() => Ward)
  @JoinColumn()
  ward: Ward;

  @ManyToOne(() => Client, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  client: Client;

  @ManyToOne(() => Carrier)
  @JoinColumn()
  carrier: Carrier;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  orderItems: OrderItem[];
}
