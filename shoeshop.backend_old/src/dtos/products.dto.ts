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

export enum SortEnums {
  CURRENT_PRICE_DOWN = '-currentPrice',
  CURRENT_PRICE_UP = 'currentPrice',
  CREATED_AT = '-createdAt',
  PRIORITY = '-priority',
}

export interface IFilerPrice {
  min: number;
  max: number;
}

export interface IPaging {
  page: number;
  limit: number;
}

export interface ListProductArgs {
  sort?: SortEnums;
  filters?: {
    prices?: IFilerPrice;
    category?: string;
    tag?: string;
    name?: string;
    isSellWell?: boolean;
    isSpecial?: boolean;
    colors?: number[];
    sizes?: number[];
  };
  paging?: IPaging;
}
