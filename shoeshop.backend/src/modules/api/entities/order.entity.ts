import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { BaseModel } from './base-model.entity';

@Entity('order')
export class Order extends BaseModel {
  constructor(partial: Partial<Order>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'client_id',
    type: 'int',
  })
  clientId: number;

  @Column({
    type: 'int',
    default: 1,
  })
  status: number;

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
  })
  price: string;

  @Column({
    name: 'shipping_fee',
    type: 'int',
  })
  shippingFee: number;

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

  @Column({
    type: 'int',
  })
  wardId: number;

  @Column({
    type: 'int',
  })
  districtId: number;

  @Column({
    type: 'int',
  })
  cityId: number;
}
