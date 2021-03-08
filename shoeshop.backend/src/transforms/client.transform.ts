import { Client } from '../models';
import { StringHelper } from '../helpers';

export interface GClient extends Client {}

export const toGClient = (args: any): Client => {
  const data = {
    id: args.id,
    userId: args.users_id,
    avatar: args.avatar,
    gender: args.gender,
    dob: args.dob,
  };
  return StringHelper.deepTrim(data);
};
