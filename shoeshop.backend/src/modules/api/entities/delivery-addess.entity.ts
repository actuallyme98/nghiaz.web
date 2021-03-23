import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { BaseModel } from './base-model.entity';

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
    name: 'client_id',
    type: 'int',
    length: 30,
  })
  clientId: string;

  @Column({
    name: 'city_id',
    type: 'int',
    length: 30,
  })
  cityId: string;

  @Column({
    name: 'district_id',
    type: 'int',
    length: 30,
  })
  districtId: string;

  @Column({
    name: 'ward_id',
    type: 'int',
    length: 30,
  })
  wardId: string;

  @Column({
    name: 'is_default',
    type: 'int',
    length: 30,
  })
  isDefault: string;
}
