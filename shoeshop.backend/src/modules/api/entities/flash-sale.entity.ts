import { Column, PrimaryGeneratedColumn, Entity, OneToMany, JoinColumn } from 'typeorm';
import { BaseModel } from './base-model.entity';

import { FlashSaleItem } from '@api/entities';

@Entity('flash_sale')
export class FlashSale extends BaseModel {
  constructor(partial: Partial<FlashSale>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({
    type: 'nvarchar',
    length: 100,
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
    type: 'int',
    default: 1,
  })
  status: number;

  // Relationship
  @OneToMany(
    type => FlashSaleItem,
    item => item.flashSaleId,
  )
  @JoinColumn({ name: 'id', referencedColumnName: 'flash_sale_id' })
  items: FlashSaleItem[];
}
