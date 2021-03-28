import { Column, PrimaryGeneratedColumn, Entity, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { BaseModel } from './base-model.entity';

import { GenderEnum } from '@api/enums';

import { DeliveryAddress, Cart } from '@api/entities';
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
  @OneToMany(() => DeliveryAddress, (address) => address.client)
  @JoinColumn()
  addresses: DeliveryAddress[];

  @OneToOne(() => Cart)
  @JoinColumn()
  cart: Cart;
}
