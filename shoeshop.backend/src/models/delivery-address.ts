import { BaseModel } from './base-model';

export interface DeliveryAddress extends BaseModel {
  id?: number;
  fullName: string;
  address: string;
  clientId: string;
  cityId: number;
  districtId: number;
  wardId: number;
  isDefault: boolean;
}
