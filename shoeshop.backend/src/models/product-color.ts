import { BaseModel } from './base-model';

export interface ProductColor extends BaseModel {
  id?: number;
  productId: number;
  name: string;
}
