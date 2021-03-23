import { BaseModel } from './base-model';

export interface ProductVideo extends BaseModel {
  id?: number;
  productId: number;
  thumbnail: string;
  video: string;
  youtubeUrl: string;
}
