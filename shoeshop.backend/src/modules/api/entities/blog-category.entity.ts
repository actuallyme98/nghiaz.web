import { Column, PrimaryGeneratedColumn, Entity, JoinColumn, ManyToMany } from 'typeorm';
import { BaseModel } from './base-model.entity';

import { Blog } from '@api/entities';

@Entity('blog_category')
export class BlogCategory extends BaseModel {
  constructor(partial: Partial<BlogCategory>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('rowid')
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
  @ManyToMany(() => Blog)
  @JoinColumn()
  blogs: Blog[];
}
