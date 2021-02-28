import { BaseModel } from './base-model';

export interface ProductImage extends BaseModel {
  id?: number;
  productId: number;
  image: string;
  alt: string;
}
