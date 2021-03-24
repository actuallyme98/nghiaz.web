import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';
import { BaseModel } from './base-model.entity';

@Entity('blog')
export class Blog extends BaseModel {
  constructor(partial: Partial<Blog>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'nvarchar',
    length: 150,
  })
  title: string;

  @Column({
    type: 'int',
    default: 1,
  })
  status: number;

  @Column({
    type: 'char',
    length: 150,
  })
  thumbnail: string;

  @Column({
    name: 'short_description',
    type: 'nvarchar',
    length: 150,
  })
  shortDescription: string;

  @Column({
    type: 'ntext',
  })
  description: string;

  @Column({
    type: 'char',
    length: 100,
  })
  slug: string;

  @Column({
    type: 'char',
    length: 150,
  })
  image: string;
}
