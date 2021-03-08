import { Router, Express, Response, NextFunction } from 'express';
import { AuthService } from '../services';
import { APIRequest } from '../interfaces';

const router = Router();

module.exports = (app: Express) => {
  app.use('/api/auth', router);
};

router.post('/token', async (req: APIRequest, res: Response, next: NextFunction) => {
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

router.get('/me', async (req: APIRequest, res: Response) => {
  try {
    // validate request
    const user = await AuthService.validateRequest(req);
    if (user) {
      return res.json({ me: user });
    }
  } catch (err) {
    return res.json({ message: String(err), status: false });
  }
});

router.post('/logout', async (req: APIRequest, res: Response) => {
  res.clearCookie('JWT');
  res.json({ status: true });
});
