import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { BaseModel } from './base-model.entity';

@Entity('carrier')
export class Carrier extends BaseModel {
  constructor(partial: Partial<Carrier>) {
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
  fee: number;

  @Column({
    type: 'nvarchar',
    length: 50,
  })
  description: string;
}
