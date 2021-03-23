import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { BaseModel } from './base-model.entity';

@Entity('material')
export class Material extends BaseModel {
  constructor(partial: Partial<Material>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({
    type: 'nvarchar',
    length: 30,
  })
  name: string;
}
