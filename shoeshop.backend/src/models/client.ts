import { BaseModel } from './base-model';

export enum EnumGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export interface Client extends BaseModel {
  id?: number;
  userId: number;
  gender: EnumGender;
  avatar: string;
  dob: string;
}
