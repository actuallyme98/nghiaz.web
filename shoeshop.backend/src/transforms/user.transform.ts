import { User } from '../models';

export const toGUser = (args: any): User => {
  return {
    ...args,
  };
};
