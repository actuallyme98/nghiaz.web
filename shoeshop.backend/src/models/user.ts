import { BaseModel } from './base-model';

export interface User extends BaseModel {
  id?: number;
  username: string;
  email?: string;
  password: string;
  isSupperUser: boolean;
  firstName: string;
  lastName: string;
}
