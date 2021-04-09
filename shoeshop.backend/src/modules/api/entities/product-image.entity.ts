import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '.';
import { BaseModel } from './base-model.entity';

@Entity('product_image')
export class ProductImage extends BaseModel {
  constructor(partial: Partial<ProductImage>) {
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

  // Relationship
  @ManyToOne((type) => Product, (product) => product.images)
  @JoinColumn()
  product: Product;
}
