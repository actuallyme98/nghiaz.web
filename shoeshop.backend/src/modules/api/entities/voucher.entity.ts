import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { BaseModel } from './base-model.entity';

@Entity('voucher')
export class Voucher extends BaseModel {
  constructor(partial: Partial<Voucher>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  title: string;

  @Column({
    name: 'start_date',
    type: 'char',
    length: 30,
  })
  startDate: string;

  @Column({
    name: 'end_date',
    type: 'char',
    length: 30,
  })
  endDate: string;

  @Column({
    name: 'percent_discount',
    type: 'int',
  })
  percentDiscount: number;

  @Column({
    type: 'int',
  })
  amount: number;

  @Column({
    name: 'max_amount',
    type: 'int',
  })
  maxAmount: number;

  @Column({
    type: 'int',
  })
  status: number;

  @Column({
    type: 'int',
  })
  quantity: number;

  @Column({
    name: 'require_max_price',
    type: 'int',
  })
  requireMaxPrice: number;

  @Column({
    name: 'require_min_price',
    type: 'int',
  })
  requireMinPrice: number;
}
