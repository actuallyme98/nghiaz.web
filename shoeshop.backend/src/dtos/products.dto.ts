export interface UpdateColorArgs {
  id: number;
  name: string;
  code: string;
}

export interface UpdateSizeArgs {
  id: number;
  name: number;
}

export interface CreateProductArgs {
  id: number;
  code?: string;
  name: string;
  price: number;
  vat: number;
  status: number;
  slug?: string;
  discountPrice?: number;
  currentPrice?: number;
  isSellWell: number;
  isSpecial: number;
  priority: number;
  thumbnail?: string;
  shortDescription?: string;
  description?: string;
  bodyDetail?: string;
  soleDetail?: string;
  quantity: number;
  colorIds: number[];
  categoryIds: number[];
  sizeIds: number[];
}
