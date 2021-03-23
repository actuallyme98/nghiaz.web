import { AuthService } from '../../services';
import { Response } from 'express';
import { APIRequest } from '../../interfaces';

export const authMiddleware = async (req: APIRequest, res: Response, next: () => void) => {
  // validate request
  try {
    const user = await AuthService.validateRequest(req);
    if (!user || !user.isSupperUser) {
      return res.json({ message: String('Unauthorized'), status: false });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.json({ message: String(err), status: false });
  }
};
