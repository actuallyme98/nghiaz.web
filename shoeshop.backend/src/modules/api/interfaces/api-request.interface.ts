import { Request } from 'express';
import { User } from '../entities';

export interface APIRequest extends Request {
  user?: User;
}
