import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { BaseModel } from './base-model.entity';

@Entity('ward')
export class Ward extends BaseModel {
  constructor(partial: Partial<Ward>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'district_id',
    type: 'int',
  })
  districtId: number;

  @Column({
    type: 'int',
    unique: true,
    nullable: false,
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
