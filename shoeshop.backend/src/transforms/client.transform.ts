import { Client } from '../models';

export interface GClient extends Client {}

export const toGClient = (args: any): Client => {
  return {
    id: args.id,
    userId: args.users_id,
    avatar: args.avatar,
    gender: args.gender,
    dob: args.dob,
  };
};
