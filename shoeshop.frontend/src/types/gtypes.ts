export interface QueryToProductsArgs {
  isSellWell?: boolean;
  isSpecial?: boolean;
  status?: boolean;
  currentPrice?: number;
  colors?: number[];
  sizes?: number[];
  priceGte?: number;
  priceLte?: number;
  orderBy?: SHOES_API.SortOptions;
}

export enum EnumGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  UNDEFINED = 'UNDEFINED',
}

export interface GClient {
  id: number;
  userId: number;
  gender?: EnumGender;
  avatar?: string;
  dob?: string;
}

export interface GDeliveryAddress {
  id: number;
  fullName: string;
  phone: string;
  address: string;
  client: GClient;
  city: GCity;
  district: GDistrict;
  ward: GWard;
  isDefault: boolean;
}

export interface GCity {
  id: number;
  code: number;
  name: string;
  isActive: boolean;
}

export interface GDistrict {
  id: number;
  cityId: number;
  code: number;
  name: string;
  isActive: boolean;
}

export interface GWard {
  id: number;
  districtID: number;
  code: number;
  name: string;
  isActive: boolean;
}

export interface GDeliveryAddress {
  id: number;
  fullName: string;
  phone: string;
  address: string;
  client: GClient;
  city: GCity;
  district: GDistrict;
  ward: GWard;
  isDefault: boolean;
}
