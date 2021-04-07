import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { BaseModel } from './base-model.entity';

@Entity('contact')
export class Contact extends BaseModel {
  constructor(partial: Partial<Contact>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'nvarchar',
    length: 50,
  })
  from: string;

  @Column({
    type: 'char',
    length: 40,
  })
  email: string;

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
    type: 'ntext',
  })
  content: string;
}
