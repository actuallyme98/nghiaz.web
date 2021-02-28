import { BaseModel } from './base-model';

export interface ProductTag extends BaseModel {
  id?: number;
  code: string;
  name: string;
  status: string;
}
