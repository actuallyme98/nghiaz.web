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

export type OrderStatusEnums = 'CONFIRMING' | 'PREPARING' | 'SHIPPING' | 'SUCCESS' | 'FAILED';

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
  isDefault: number;
}

export interface GCity {
  id: number;
  code: number;
  name: string;
  isActive: number;
}

export interface GDistrict {
  id: number;
  cityId: number;
  code: number;
  name: string;
  isActive: number;
}

export interface GWard {
  id: number;
  districtID: number;
  code: number;
  name: string;
  isActive: number;
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
  isDefault: number;
}
