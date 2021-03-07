import { Response, NextFunction } from 'express';
import { APIRequest } from '../interfaces';

// helpers
import authService from './auth-service';
import { ErrorHelper } from '../helpers';

export const authMiddleware = async (req: APIRequest, res: Response, next: NextFunction) => {
  // validate request
  const user = await authService.validateRequest(req);
  if (!user) {
    ErrorHelper.UnauthorizedException('Unauthorized');
  }
  req.user = user;
  next();
};
