import { PrimaryGeneratedColumn, Entity, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { BlogCategory } from '.';
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
    type: 'char',
    length: 150,
  })
  thumbnail: string;

  @Column({
    name: 'short_description',
    type: 'ntext',
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

  // Relationship
  @ManyToOne(() => BlogCategory, (type) => type.blogs)
  @JoinColumn()
  category: BlogCategory;
}
