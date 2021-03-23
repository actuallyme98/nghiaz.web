import { BaseModel } from './base-model';

export enum EnumGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  UNDEFINED = 'UNDEFINED',
}

export interface Client extends BaseModel {
  id?: number;
  userId: number;
  gender?: EnumGender;
  avatar?: string;
  dob?: string;
}
