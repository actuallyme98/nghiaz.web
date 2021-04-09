import { Column, PrimaryGeneratedColumn, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from './base-model.entity';

import { Blog } from '@api/entities';

@Entity('blog_category')
export class BlogCategory extends BaseModel {
  constructor(partial: Partial<BlogCategory>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'nvarchar',
    length: 50,
  })
  name: string;

  @Column({
    type: 'char',
    length: 50,
  })
  slug: string;

  // Relationship
  @OneToMany(() => Blog, (type) => type.category)
  @JoinColumn()
  blogs: Blog[];
}
