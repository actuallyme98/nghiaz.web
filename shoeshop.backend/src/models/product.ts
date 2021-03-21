import { BaseModel } from './base-model';

export interface Product extends BaseModel {
  id?: number;
  code?: string;
  name: string;
  price: number;
  vat: number;
  status: boolean;
  slug?: string;
  discountPrice?: number;
  currentPrice?: number;
  isSellWell: boolean;
  isSpecial: boolean;
  priority: number;
  thumbnail?: string;
  shortDescription?: string;
  description?: string;
  bodyDetail?: string;
  soleDetail?: string;
  quantity: number;
}
