import { BaseModel } from './base-model';

export interface Product extends BaseModel {
  id?: string;
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
  weight: number;
  thumbnail?: string;
  shortDescription?: string;
  description?: string;
  originId?: number;
  materialId?: number;
  sizeId?: string;
  colorId?: string;
  bodyDetail?: string;
  soleDetail?: string;
  quantity: number;
}
