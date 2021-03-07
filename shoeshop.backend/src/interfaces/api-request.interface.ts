import { Request } from 'express';
import { User } from '../models';

export interface APIRequest extends Request {
  user?: User;
}
