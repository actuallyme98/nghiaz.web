import { Column, PrimaryGeneratedColumn, Entity, OneToMany, JoinColumn } from 'typeorm';
import { BaseModel } from './base-model.entity';

import { GenderEnum } from '@api/enums';

import { DeliveryAddress } from '@api/entities';
@Entity('client')
export class Client extends BaseModel {
  constructor(partial: Partial<Client>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'char',
    length: 10,
    default: GenderEnum.UNDEFINED,
  })
  gender: GenderEnum;

  @Column({
    type: 'char',
    length: 150,
    default: '',
  })
  avatar: string;

  @Column({
    type: 'char',
    length: 30,
    default: '',
  })
  dob: string;

  // Relationship
  @OneToMany((type) => DeliveryAddress, (address) => address.client)
  @JoinColumn()
  addresses: DeliveryAddress[];
}
