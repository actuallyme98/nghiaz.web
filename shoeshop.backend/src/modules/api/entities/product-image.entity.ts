import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { BaseModel } from './base-model.entity';

@Entity('product_image')
export class ProductImage extends BaseModel {
  constructor(partial: Partial<ProductImage>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({
    name: 'product_id',
    type: 'int',
  })
  productId: number;

  @Column({
    type: 'char',
    length: 150,
  })
  url: string;
}
