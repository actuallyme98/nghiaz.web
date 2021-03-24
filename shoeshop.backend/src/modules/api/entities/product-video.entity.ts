import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '.';
import { BaseModel } from './base-model.entity';

@Entity('product_video')
export class ProductVideo extends BaseModel {
  constructor(partial: Partial<ProductVideo>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'char',
    length: 150,
  })
  url: string;

  @Column({
    type: 'char',
    length: 150,
  })
  thumbnail: string;

  @Column({
    type: 'char',
    length: 150,
  })
  youtube_url: string;

  // Relationship
  @ManyToOne((type) => Product, (product) => product.videos)
  @JoinColumn()
  product: Product;
}
