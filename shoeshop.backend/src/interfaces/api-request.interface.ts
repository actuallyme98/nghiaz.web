import { Request } from 'express';

import { RequestUser } from '../transforms';

export interface APIRequest extends Request {
  user?: RequestUser;
}
