import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { BaseModel } from './base-model.entity';

@Entity('voucher_code')
export class VoucherCode extends BaseModel {
  constructor(partial: Partial<VoucherCode>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({
    name: 'voucher_id',
    type: 'int',
  })
  voucherId: number;

  @Column({
    type: 'char',
    length: 30,
  })
  code: string;

  @Column({
    type: 'int',
  })
  status: number;

  @Column({
    name: 'is_used',
    type: 'int',
  })
  isUsed: number;
}
