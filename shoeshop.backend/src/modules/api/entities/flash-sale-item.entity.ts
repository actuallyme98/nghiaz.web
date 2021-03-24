import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './base-model.entity';

import { Product } from '@api/entities';

@Entity('flash_sale_item')
export class FlashSaleItem extends BaseModel {
  constructor(partial: Partial<FlashSaleItem>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'flash_sale_id',
    type: 'int',
  })
  flashSaleId: number;

  @Column({
    name: 'sale_price',
    type: 'int',
  })
  salePrice: number;

  @Column({
    type: 'int',
  })
  quantity: number;

  @Column({
    name: 'sold_quantity',
    type: 'int',
  })
  soldQuantity: number;

  // Relationship
  @ManyToOne((type) => Product, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Product;
}
