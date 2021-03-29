import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './base-model.entity';
import { Voucher } from './voucher.entity';

@Entity('voucher_code')
export class VoucherCode extends BaseModel {
  constructor(partial: Partial<VoucherCode>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'char',
    length: 30,
  })
  code: string;

  @Column({
    name: 'is_used',
    type: 'int',
    default: 0,
  })
  isUsed: number;

  // Relationship
  @ManyToOne(() => Voucher, (voucher) => voucher.voucherCodes)
  @JoinColumn()
  voucher: Voucher;
}
