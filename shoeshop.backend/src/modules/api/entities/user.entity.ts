import { Column, PrimaryGeneratedColumn, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from './base-model.entity';
import { EncryptHelper } from '@base/helpers';
import { Exclude } from 'class-transformer';

import { Client } from '@api/entities';

@Entity('users')
export class User extends BaseModel {
  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({
    type: 'char',
    length: 60,
    unique: true,
    nullable: false,
  })
  username: string;

  @Exclude()
  @Column({
    type: 'char',
    length: 128,
    nullable: false,
  })
  password: string;

  static async hashPassword(password: string) {
    return EncryptHelper.hash(password);
  }

  @Column({
    name: 'is_supperuser',
    type: 'int',
  })
  isSupperUser: number;

  @Column({
    name: 'first_name',
    type: 'nvarchar',
    length: 60,
  })
  firstName: string;

  @Column({
    name: 'last_name',
    type: 'nvarchar',
    length: 60,
  })
  lastName: string;

  // Relationship
  @ManyToOne((type) => Client)
  @JoinColumn()
  client: Client;
}
