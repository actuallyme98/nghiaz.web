import { Router, Express, Request, Response, NextFunction } from 'express';
import { AuthService } from '../services';
import { authMiddleware } from '../services/auth-middleware';
import { APIRequest } from '../interfaces';

const router = Router();

module.exports = (app: Express) => {
  app.use('/api/auth', router);
};

router.post('/token', async (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body;
  try {
    const loginData = await AuthService.login(payload.username, payload.password);
    res.cookie('JWT', 'Bearer ' + loginData.token, {
      maxAge: loginData.expires,
      httpOnly: false,
    });
    return res.json(loginData);
  } catch (err) {
    return res.json({ message: String(err), status: false });
  }
});

router.get('/me', authMiddleware, async (req: APIRequest, res: Response) => {
  try {
    return res.json({ me: req.user });
  } catch (err) {
    return res.json({ message: String(err), status: false });
  }
});
