import { Response, NextFunction } from 'express';
import { APIRequest } from '../interfaces';

// helpers
import authService from './auth-service';

export const authMiddleware = async (req: APIRequest, res: Response, next: NextFunction) => {
  // validate request
  const user = await authService.validateRequest(req);
  if (!user) {
    throw new Error('Unauthorized');
  }
  req.user = user;
  next();
};
