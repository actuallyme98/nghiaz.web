import { Column, PrimaryGeneratedColumn, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from './base-model.entity';

import { Client, Ward, City, District } from '@api/entities';
@Entity('delivery_address')
export class DeliveryAddress extends BaseModel {
  constructor(partial: Partial<DeliveryAddress>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({
    name: 'full_name',
    type: 'nvarchar',
    length: 100,
  })
  fullName: string;

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
    name: 'is_default',
    type: 'int',
    default: 0,
  })
  isDefault: number;

  // Relationship
  @ManyToOne(() => Client)
  @JoinColumn()
  client: Client;

  @ManyToOne(() => City)
  @JoinColumn()
  city: City;

  @ManyToOne(() => District)
  @JoinColumn()
  district: District;

  @ManyToOne(() => Ward)
  @JoinColumn()
  ward: Ward;
}
