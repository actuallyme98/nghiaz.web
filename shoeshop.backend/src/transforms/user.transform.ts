import { ClientService } from '../services';

import { User } from '../models';
import { GClient } from './client.transform';

import { StringHelper } from '../helpers';

export interface GUser extends User {
  client?: GClient;
}

export interface RequestUser {
  id?: number;
  firstName: string;
  lastName: string;
  createdAt?: string;
  updatedAt?: string;
  client?: GClient;
}

export const toGUser = async (args: any): Promise<GUser> => {
  const { id } = args;
  const client = await ClientService.findOneByUserId(id);
  const data = {
    id,
    username: args.username,
    password: args.password,
    firstName: args.first_name,
    lastName: args.last_name,
    email: args.email,
    isSupperUser: args.is_supperuser,
    createdAt: args.created_at,
    updatedAt: args.updated_at,
    client,
  };
  return StringHelper.deepTrim(data);
};
