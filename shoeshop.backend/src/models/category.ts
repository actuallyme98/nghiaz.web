import { BaseModel } from './base-model';

export interface Category extends BaseModel {
  id?: string;
  name: string;
  image?: string;
  slug?: string;
}
