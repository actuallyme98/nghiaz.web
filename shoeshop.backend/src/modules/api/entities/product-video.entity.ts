import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
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
    name: 'product_id',
    type: 'int',
  })
  productId: number;

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
}
