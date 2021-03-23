import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { BaseModel } from './base-model.entity';

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
  })
  status: number;
}
