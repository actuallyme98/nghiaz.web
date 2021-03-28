import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { BaseModel } from './base-model.entity';

@Entity('carrier')
export class CartItem extends BaseModel {
  constructor(partial: Partial<CartItem>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'nvarchar',
    length: 50,
  })
  name: string;

  @Column({
    type: 'nvarchar',
    length: 50,
  })
  method: string;

  @Column({
    type: 'int',
  })
  fee: string;

  @Column({
    type: 'nvarchar',
    length: 50,
  })
  description: string;
}
