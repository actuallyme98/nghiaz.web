import { Client } from '../models';

export const toGClient = (Client: any): Client => {
  return {
    ...Client,
  };
};
