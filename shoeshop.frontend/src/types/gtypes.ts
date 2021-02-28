export interface IProductItem {
  id: string;
  pk: number;
  category: string;
  title: string;
  currentPrice: number;
  originalPrice: number;
  thumbnail: string;
  createdAt?: Date;
}
