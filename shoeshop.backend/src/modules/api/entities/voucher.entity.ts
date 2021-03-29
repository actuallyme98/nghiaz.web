import { Column, PrimaryGeneratedColumn, Entity, OneToMany, JoinColumn } from 'typeorm';
import { BaseModel } from './base-model.entity';
import { VoucherCode } from './voucher-code.entity';

export type VoucherType = 'discount_price' | 'discount_percentage' | 'free_ship';

@Entity('voucher')
export class Voucher extends BaseModel {
  constructor(partial: Partial<Voucher>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('increment')
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
    type: 'char',
    length: 30,
  })
  type: VoucherType;

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
  quantity: number;

  @Column({
    name: 'require_min_price',
    type: 'int',
  })
  requireMinPrice: number;

  // Relationship
  @OneToMany(() => VoucherCode, (code) => code.voucher)
  @JoinColumn()
  voucherCodes: VoucherCode[];
}
