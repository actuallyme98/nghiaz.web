import { ClientService } from '../services';
import { Optional } from '../base/typescript-types';

import { Client, User } from '../models';
import { GClient } from './client.transform';

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

  return {
    id,
    username: args.username,
    password: args.password,
    firstName: args.first_name,
    lastName: args.last_name,
    isSupperUser: args.is_supperuser,
    createdAt: args.create_at,
    updatedAt: args.update_at,
    client,
  };
};
