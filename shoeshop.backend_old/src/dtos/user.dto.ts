import { EnumGender } from '../models';

export interface UpdateInfoArgs {
  userId: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  dob: string;
  gender: EnumGender;
}

export interface UpdatePasswordArgs {
  userId: number;
  oldPassword: string;
  newPassword: string;
}
