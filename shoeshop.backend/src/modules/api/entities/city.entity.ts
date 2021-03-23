import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { BaseModel } from './base-model.entity';

@Entity('city')
export class City extends BaseModel {
  constructor(partial: Partial<City>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({
    type: 'int',
  })
  code: number;

  @Column({
    type: 'nvarchar',
    length: 50,
  })
  name: string;

  @Column({
    name: 'is_active',
    type: 'int',
  })
  isActive: number;
}
