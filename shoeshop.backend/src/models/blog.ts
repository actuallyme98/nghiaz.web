import { BaseModel } from './base-model';

export interface Blog extends BaseModel {
  id?: string;
  title: string;
  status: boolean;
  slug?: string;
  image?: string;
  isSpecial: boolean;
  thumbnail?: string;
  short_descrtiption: string;
  description?: string;
}
