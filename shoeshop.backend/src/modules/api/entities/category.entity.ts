import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { BaseModel } from './base-model.entity';

@Entity('category')
export class Category extends BaseModel {
  constructor(partial: Partial<Category>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'nvarchar',
    length: 30,
  })
  name: string;

  @Column({
    type: 'char',
    length: 150,
  })
  image: string;

  @Column({
    type: 'char',
    length: 30,
  })
  slug: string;
}
