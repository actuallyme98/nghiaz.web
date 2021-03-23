import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToMany,
  OneToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { BaseModel } from './base-model.entity';
import { ProductImage, ProductVideo, Color, Size, Category } from '@api/entities';

@Entity('product')
export class Product extends BaseModel {
  constructor(partial: Partial<Product>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({
    type: 'char',
    length: 20,
  })
  code: string;

  @Column({
    type: 'nvarchar',
    length: 100,
  })
  name: string;

  @Column({
    type: 'ntext',
  })
  address: string;

  @Column({
    type: 'int',
  })
  price: number;

  @Column({
    name: 'discount_price',
    type: 'int',
  })
  discountPrice: number;

  @Column({
    name: 'current_price',
    type: 'int',
  })
  currentPrice: number;

  @Column({
    name: 'is_special',
    type: 'int',
  })
  isSpecial: number;

  @Column({
    name: 'is_sell_well',
    type: 'int',
  })
  isSellWell: number;

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
    type: 'char',
    length: 100,
  })
  slug: string;

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
    name: 'body_detail',
    type: 'nvarchar',
    length: 150,
  })
  bodyDetail: string;

  @Column({
    name: 'sole_detail',
    type: 'nvarchar',
    length: 150,
  })
  soleDetail: string;

  @Column({
    type: 'int',
  })
  priority: number;

  @Column({
    type: 'int',
  })
  quantity: number;

  @Column({
    type: 'int',
  })
  vat: number;

  // Relationship
  @OneToMany(
    type => ProductImage,
    image => image.productId,
    { cascade: true },
  )
  @JoinColumn({ name: 'id', referencedColumnName: 'product_id' })
  images: ProductImage[];

  @OneToMany(
    type => ProductVideo,
    video => video.productId,
    { cascade: true },
  )
  @JoinColumn({ name: 'id', referencedColumnName: 'product_id' })
  videos: ProductVideo[];

  @ManyToMany(() => Size)
  @JoinTable()
  sizes: Size[];

  @ManyToMany(() => Color)
  @JoinTable()
  colors: Color[];

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];
}
