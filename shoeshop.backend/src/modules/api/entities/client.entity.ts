import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { BaseModel } from './base-model.entity';

import { GenderEnum } from '@api/enums';

@Entity('client')
export class Client extends BaseModel {
  constructor(partial: Partial<Client>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({
    name: 'users_id',
    type: 'int',
    length: 60,
    unique: true,
    nullable: false,
  })
  usersId: string;

  @Column({
    type: 'char',
    length: 10,
  })
  gender: GenderEnum;

  @Column({
    type: 'char',
    length: 150,
  })
  avatar: string;

  @Column({
    type: 'char',
    length: 30,
  })
  dob: string;
}
