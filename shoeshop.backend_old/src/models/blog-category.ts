import { BaseModel } from './base-model';

export interface BlogCategory extends BaseModel {
  id?: string;
  name: string;
}
